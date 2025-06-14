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
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/enums/user-role.enum';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserD } from 'src/auth/decorators/users.decorator';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @ApiQuery({
    name: 'details',
    required: false,
    type: 'boolean',
    default: false,
    description: 'Get user details with more info',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('details', new DefaultValuePipe(false), ParseBoolPipe)
    details?: boolean,
  ) {
    return this.productsService.findOne(id), details;
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UserD('role') token_role: Role,
  ) {
    if (token_role !== Role.ADMIN) {
      throw new ForbiddenException('You are not authorized to patch producs');
    }
    return this.productsService.update(+id, updateProductDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
  ) {
    if (token_id !== id && token_role !== Role.USER) {
      throw new ForbiddenException('You are not authorized to patch producs');
    }
    return this.productsService.remove(+id);
  }
}
