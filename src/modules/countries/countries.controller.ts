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
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import to from 'await-to-js';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { Roles } from '../auth/auth.dto';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import {
  createCountrySchema,
  paginationCountrySchema,
  updateCountrySchema,
} from '../countries/joiSchema';
import {
  CreateCountryDto,
  ListCountries,
  UpdateCountryDto,
} from './countries.dto';
import { CountriesService } from './countries.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  /**
   * Get all countries data with pagination
   */
  @ApiResponse({
    status: 200,
    description: 'Listado de categorias',
  })
  @Get()
  async findAll(
    @Query(new JoiValidationPipe(paginationCountrySchema)) query: ListCountries,
  ): Promise<ICountry[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    const [error, data] = await to(
      this.countriesService.findAll({ skip: limit * page, take: limit }),
    );

    if (error) {
      throw new NotFoundException(error.message);
    }

    return data;
  }

  /**
   * Create a country and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'Datos de la categoria',
    type: CreateCountryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'El país ha sido creado exitosamente',
  })
  @Post('create')
  @UsePipes(new JoiValidationPipe(createCountrySchema))
  async create(@Body() createCountryDto: CreateCountryDto) {
    const [error, countryData] = await to(
      this.countriesService.create(createCountryDto),
    );
    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'El país ha sido creado exitosamente', countryData };
  }

  /**
   * Create a country and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'El país ha sido actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del país deben ser enviados',
  })
  @ApiResponse({
    status: 404,
    description: 'El país no ha sido encontrado',
  })
  @Put('update/:idCountry')
  async update(
    @Param('idCountry', ParseIntPipe) idCountry: number,
    @Body(new JoiValidationPipe(updateCountrySchema))
    updateCountryDto: UpdateCountryDto,
  ) {
    if (!idCountry)
      throw new BadRequestException('El id del país debe ser enviado');
    if (!updateCountryDto)
      throw new BadRequestException('Los datos del país deben ser enviados');

    const [error, countryUpdated] = await to(
      this.countriesService.update(idCountry, updateCountryDto),
    );
    if (error) {
      throw new NotFoundException(error.message);
    }

    return {
      message: 'El país ha sido actualizado exitosamente',
      countryUpdated,
    };
  }

  /**
   * Delete country by Id
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'El país ha sido eliminado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El id del país debe ser enviado',
  })
  @ApiResponse({
    status: 404,
    description: 'El país no ha sido encontrado',
  })
  @Delete('delete/:idCountry')
  async delete(
    @Param('idCountry', ParseIntPipe) idCountry: number,
  ): Promise<void> {
    const [error] = await to(this.countriesService.delete(idCountry));

    if (error) {
      throw new NotFoundException(error.message);
    }
  }
}
