import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CachingService } from './caching.service';
import { CreateCachingDto } from './dto/create-caching.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('caching')
@UseInterceptors(CacheInterceptor)
export class CachingController {
  constructor(private readonly cachingService: CachingService) {}

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cachingService.get(key);
  }

  @Post()
  create(@Body() createCachingDto: CreateCachingDto) {
    return this.cachingService.create(createCachingDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cachingService.remove(key);
  }
}
