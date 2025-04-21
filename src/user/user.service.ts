import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcrypt'; // Import bcrypt


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService, 
) {}

async create(createUserDto: CreateUserDto): Promise<User> {
  // Hash the password before saving
  const saltRounds = 10; // Number of salt rounds for bcrypt
  createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);

  const newUser = new this.userModel(createUserDto);
  return newUser.save(); // Save the user to the database
}

async login(email: string, password: string): Promise<{ message: string; token: string }> {
  const user = await this.userModel.findOne({ email }).exec();
  if (!user) {
    throw new UnauthorizedException('Invalid credentials'); // Throw an exception if user not found
  }

  // Compare the hashed password with the plain-text password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials'); // Throw an exception if password is incorrect
  }

  const payload = { email: user.email, sub: user._id }; // Create a payload for JWT
  const token = this.jwtService.sign(payload); // Sign the payload to create a JWT token
  return { message: "Successfully Logged In", token }; // Return the user and token
}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Retrieve all users from the database
  }

  async findOne(id: string): Promise<User | string> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return `User with ID #${id} not found`;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | string> {
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
