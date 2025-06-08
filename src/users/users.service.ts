import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // hashing password(helper function)
  private async hashData(data: string): Promise<string> {
    const salts = await Bcrypt.genSalt(10);
    return Bcrypt.hash(data, salts);
  }
  // helper function to compare password and remove it from the response
  private excludePassword(user: User): Partial<User> {
    const { password, hashedRefreshToken, ...rest } = user;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      select: ['user_id'],
    });

    if (existingUser) {
      throw new Error(`User with email ${createUserDto.email} already exists`);
    }
    const newUser: Partial<User> = {
      username: createUserDto.username,
      email: createUserDto.email,
      role: createUserDto.role,
      password: await this.hashData(createUserDto.password),
    };

    const savedUser = await this.userRepository.save(newUser);

    return this.excludePassword(savedUser);
  }

  async findAll(email?: string) {
    let users: User[];
    if (email) {
      users = await this.userRepository.find({
        where: {
          email: email,
        },
        relations: ['orders'],
      });
    } else {
      users = await this.userRepository.find({
        relations: ['orders'],
      });
    }

    return users.map((user) => this.excludePassword(user));
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
