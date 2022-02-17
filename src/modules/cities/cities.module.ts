import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'yustii-backend-common/dist/models/cities/cities.entity';
import { User } from 'yustii-backend-common/dist/models/users/users.entity';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, City])],
  controllers: [CitiesController],
  providers: [RolesGuard, CitiesService],
})
export class CitiesModule {}
