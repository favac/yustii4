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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import to from 'await-to-js';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { Roles } from '../auth/auth.dto';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCityDto, PaginationCities, UpdateCityDto } from './cities.dto';
import { CitiesService } from './cities.service';
import { createCitySchema, updateCitySchema } from './joiSchema';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  /**
   * Get all cities data with pagination
   */
  @Get()
  async findAll(@Query() query: PaginationCities): Promise<ICity[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    const [error, listCities] = await to(
      this.citiesService.findAll({ skip: limit * page, take: limit }),
    );

    if (error) {
      throw new NotFoundException(error.message);
    }

    return listCities;
  }

  /**
   * Get a city by id country data
   */
  @Get('/bycountry/:idCountry')
  async findByCountry(
    @Param('idCountry', ParseIntPipe) idCountry: number,
    @Query() query: PaginationCities,
  ): Promise<ICity[]> {
    if (!idCountry)
      throw new BadRequestException('El id del país debe ser enviado');

    const [error, citiesData] = await to(
      this.citiesService.findByCountry(idCountry, query),
    );

    if (error || !citiesData || citiesData.length === 0) {
      const messsage = error
        ? error.message
        : 'No existen ciudades para este país';
      throw new NotFoundException(messsage);
    }

    return citiesData;
  }

  /**
   * Create a city and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @UsePipes(new JoiValidationPipe(createCitySchema))
  async create(@Body() createCityDto: CreateCityDto) {
    const [error, cityCreated] = await to(
      this.citiesService.create(createCityDto),
    );
    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'La ciudad ha sido creada', cityCreated };
  }

  /**
   * Create a city and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('update/:idCity')
  async update(
    @Param('idCity', ParseIntPipe) idCity: number,
    @Body(new JoiValidationPipe(updateCitySchema))
    updateCountryDto: UpdateCityDto,
  ) {
    if (!idCity)
      throw new BadRequestException('El id de ciudad debe ser enviado');
    if (!updateCountryDto)
      throw new BadRequestException(
        'Los datos a actualizar de la ciudad deben ser enviados',
      );

    const [error, cityUpdated] = await to(
      this.citiesService.update(idCity, updateCountryDto),
    );
    if (error) {
      throw new NotFoundException(error.message);
    }

    return { message: 'La ciudad ha sido actualizada', cityUpdated };
  }

  /**
   * Delete city by Id
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('delete/:idCity')
  async delete(@Param('idCity', ParseIntPipe) idCity: number) {
    if (!idCity)
      throw new BadRequestException('El id de ciudad debe ser enviado');

    const [error] = await to(this.citiesService.delete(idCity));

    if (error) {
      throw new NotFoundException(error.message);
    }
    return { message: 'La ciudad ha sido eliminada' };
  }
}
