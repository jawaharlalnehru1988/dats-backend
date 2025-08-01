import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';
import { MongoError } from '../common/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user?: any }> {
    try {
      // Hash the password before saving
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const user = await newUser.save();

      // Return user without password
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
      };
      console.log('User created:', userResponse);
      return { message: 'User created successfully', user: userResponse };
    } catch (error: unknown) {
      if ((error as MongoError).code === 11000) {
        return { message: 'A user with this email already exists.' };
      }
      throw error;
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      name: user.name,
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return { message: 'Successfully Logged In', token };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | string> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return `User with ID #${id} not found`;
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      return `User with ID #${id} not found`;
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User | string> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      return `User with ID #${id} not found`;
    }
    return deletedUser;
  }
}
