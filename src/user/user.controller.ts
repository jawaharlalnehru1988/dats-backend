import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser, UserPayload } from '../auth/user.decorator';

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

  // Protected routes (authentication required)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return { message: 'User profile', user };
  }

  // Admin only routes
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: UserPayload,
  ) {
    // Users can only update their own profile, unless they're admin
    if (user.role !== 'admin' && user.sub !== id) {
      throw new BadRequestException('You can only update your own profile');
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
