import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  create(creatUserDto: CreateUserDto) {
    return createUserDto;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all Users matching the search term: ${search}`;
    }
    return `This action returns all   Users`;
  }

  findOne(id: number) {
    return `This action returns a #${id}  Users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { id, ...updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id}  Users`;
  }
}
