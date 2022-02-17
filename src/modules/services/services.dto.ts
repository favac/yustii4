import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Category } from 'yustii-backend-common/dist/models/categories/categories.entity';

export class CreateServiceDto {
  @ApiPropertyOptional()
  idService?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  isForPersons: boolean;

  @ApiProperty()
  isForCompanies: boolean;

  @ApiProperty()
  idCategory: Category;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

export class PaginationServices {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
