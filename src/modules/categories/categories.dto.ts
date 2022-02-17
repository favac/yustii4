import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class ListCategories {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
