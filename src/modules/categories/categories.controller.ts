import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { to } from 'await-to-js';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  ListCategories,
  UpdateCategoryDto,
} from './categories.dto';
import { createCategorySchema, updateCategorySchema } from './joiSchema';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/auth.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  /**
   * Get all categories data with pagination
   */
  @ApiResponse({
    status: 200,
    description: 'Listado de categorias',
  })
  @Get()
  async findAll(@Query() query: ListCategories): Promise<ICategory[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    const [error, data] = await to(
      this.categoriesService.findAll({ skip: limit * page, take: limit }),
    );

    if (error) {
      throw new NotFoundException(error.message);
    }

    return data;
  }

  /**
   * Create a category and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'Datos de la categoria',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'La categoria ha sido creada exitosamente',
  })
  @Post('create')
  async create(
    @Body(new JoiValidationPipe(createCategorySchema))
    createCategoryDto: CreateCategoryDto,
  ) {
    const [error, categoryCreated] = await to(
      this.categoriesService.create(createCategoryDto),
    );
    if (error) {
      throw new NotFoundException(error.message);
    }

    return {
      message: 'La categoria ha sido creada exitosamente',
      categoryCreated,
    };
  }

  /**
   * Create a category and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'Datos de la categoria a actualizar',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'La categoria ha sido actualizada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El id de la categoria debe ser enviado',
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la categoria deben ser enviados',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Put('update/:idCategory')
  async update(
    @Param('idCategory', ParseIntPipe) idCategory: number,
    @Body(new JoiValidationPipe(updateCategorySchema))
    updateCategoryDto: UpdateCategoryDto,
  ) {
    console.log('idCategory', idCategory);
    if (!idCategory)
      throw new BadRequestException('El id de la categoria debe ser enviado');

    if (!updateCategoryDto)
      throw new BadRequestException(
        'Los datos de la categoria deben ser enviados',
      );

    const [error, categoryUpdated] = await to(
      this.categoriesService.update(idCategory, updateCategoryDto),
    );
    if (error) {
      throw new NotFoundException(error.message);
    }

    return {
      message: 'La categoria ha sido actualizada exitosamente',
      categoryUpdated,
    };
  }

  /**
   * Softly delete category by Id
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'La categoria ha sido eliminada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El id de la categoria debe ser enviado',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Delete('delete/:idCategory')
  async delete(@Param('idCategory') idCategory: number) {
    if (!idCategory)
      throw new BadRequestException('El id de la categoria debe ser enviado');

    const [error] = await to(this.categoriesService.delete(idCategory));

    if (error) {
      throw new NotFoundException(error.message);
    }

    return { message: 'La categoria ha sido eliminada exitosamente' };
  }
}
