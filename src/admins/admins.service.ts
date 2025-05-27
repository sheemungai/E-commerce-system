import { Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './dto';

@Injectable()
export class AdminsService {
  create(createAdminDto: CreateAdminDto): string {
    return `Admin with name ${createAdminDto.name} created successfully.`;
  }
  findAll() {
    return `this action returns all admins`;
  }
  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }
  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin with data: ${JSON.stringify(updateAdminDto)}`;
  }
  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
