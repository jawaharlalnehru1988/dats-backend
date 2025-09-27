import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Public routes (no authentication required)
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email, password);
  }

  // Public - User profile (now open to everyone)
  @Get('profile')
  getProfile() {
    return { message: 'User profile endpoint is public now' };
  }

  // Public - Get all users (now open to everyone)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Public - Get user by ID (now open to everyone)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Public - Update user (now open to everyone)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // Public - Delete user (now open to everyone)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
