import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ServicesModule } from './services/services.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    ServicesModule,
    CitiesModule,
    CountriesModule,
  ],
})
export class ApiModule {}
