import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'yustii-backend-common/dist/models/services/services.entity';
import { User } from 'yustii-backend-common/dist/models/users/users.entity';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Service])],
  controllers: [ServicesController],
  providers: [RolesGuard, ServicesService],
})
export class ServicesModule {}
