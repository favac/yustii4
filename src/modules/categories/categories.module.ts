import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'yustii-backend-common/dist/models/categories/categories.entity';
import { User } from 'yustii-backend-common/dist/models/users/users.entity';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  controllers: [CategoriesController],
  providers: [RolesGuard, CategoriesService],
})
export class CategoriesModule {}
