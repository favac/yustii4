import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'yustii-backend-common/dist/models/countries/countries.entity';
import { User } from 'yustii-backend-common/dist/models/users/users.entity';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Country])],
  controllers: [CountriesController],
  providers: [RolesGuard, CountriesService],
})
export class CountriesModule {}
