import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  ParseBoolPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/users/enums/user-role.enum';
import { Roles } from 'src/auth/decorators';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserD } from 'src/auth/decorators/users.decorator';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @ApiQuery({
    name: 'details',
    required: false,
    type: 'boolean',
    default: false,
    description: 'Get user details with more info ',
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
    @Query('details', new DefaultValuePipe(false), ParseBoolPipe)
    details?: boolean,
  ) {
    if (token_id !== id && token_role !== Role.ADMIN) {
      throw new ForbiddenException('You are not authorized to get this order');
    }
    try {
      return await this.ordersService.findOne(id, details);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(
    @Param('id', ParseBoolPipe) id: number,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
  ) {
    if (token_id !== id && token_role !== Role.USER) {
      throw new ForbiddenException('You are not authorized to delete orders');
    }
    return this.ordersService.remove(+id);
  }
}
