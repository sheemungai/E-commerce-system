import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Public, Roles } from 'src/auth/decorators';
import { Role } from 'src/users/enums/user-role.enum';

@ApiTags('orderitems')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
@Controller('orderitems')
export class OrderitemsController {
  constructor(private readonly orderitemsService: OrderitemsService) {}

  @Post()
  @Public()
  create(@Body() createOrderitemDto: CreateOrderitemDto) {
    return this.orderitemsService.create(createOrderitemDto);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.orderitemsService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderitemsService.findOne(+id);
  }

  @Roles(Role.USER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderitemDto: UpdateOrderitemDto,
  ) {
    return this.orderitemsService.update(+id, updateOrderitemDto);
  }

  @Roles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderitemsService.remove(+id);
  }
}
