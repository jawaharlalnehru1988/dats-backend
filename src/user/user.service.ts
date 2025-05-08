import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService, 
) {}

async create(createUserDto: CreateUserDto): Promise<User> {
 
  const newUser = new this.userModel(createUserDto);
  return newUser.save(); 
}

async login(email: string, password: string): Promise<{ message: string; token: string }> {
  const user = await this.userModel.findOne({ email }).exec();
  if (!user) {
    throw new UnauthorizedException('Invalid credentials'); 
  }

  const payload = { email: user.email, sub: user._id }; 
  const token = this.jwtService.sign(payload); 
  return { message: "Successfully Logged In", token }; 
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
