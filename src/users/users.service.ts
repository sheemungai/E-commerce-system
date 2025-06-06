import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
  async findAll(name?: string): Promise<User[] | User> {
    if (name) {
      return await this.userRepository.find({
        relations: ['orders'],
      });
    }
    return await this.userRepository.find({
      relations: ['orders'],
    });
  }

  async findOne(id: number): Promise<User | string> {
    return await this.userRepository
      .findOne({
        where: { user_id: id },
        relations: ['order'],
      })
      .then((user) => {
        if (!user) {
          return `No user found with id ${id}`;
        }
        return user;
      })
      .catch((error) => {
        console.error('Error finding user:', error);
        throw new Error(`Failed to find user with id ${id}`);
      });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository
      .update(id, updateUserDto)
      .then((result) => {
        if (result.affected === 0) {
          return `No user found with id ${id}`;
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        throw new Error(`Failed to update user with id ${id}`);
      });
  }

  async remove(id: number): Promise<string> {
    return await this.userRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No user found with id ${id}`;
        }
        return `user with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing user:', error);
        throw new Error(`Failed to remove user with id ${id}`);
      });
  }
}
