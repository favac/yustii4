import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Country } from 'yustii-backend-common/dist/models/countries/countries.entity';

export class CreateCityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isoCode: string;

  @ApiProperty()
  idCountry: Country;
}

export class UpdateCityDto extends PartialType(CreateCityDto) {}

export class PaginationCities {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class DeleteCityDto {
  @ApiProperty()
  idCity: number;
}
