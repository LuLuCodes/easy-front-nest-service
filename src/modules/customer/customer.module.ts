import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../../db.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [DBModule, ConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService, CacheService],
})
export class CustomerModule {}
