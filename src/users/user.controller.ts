import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  @Get()
  findAll(@Query() query: ListAllUserDto) {
    return 'This action returns all users';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
