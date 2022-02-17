import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isoCode: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

export class ListCountries {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
