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
import { to } from 'await-to-js';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { Roles } from '../auth/auth.dto';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { createServiceSchema, updateServiceSchema } from './joiSchema';
import {
  CreateServiceDto,
  PaginationServices,
  UpdateServiceDto,
} from './services.dto';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  /**
   * Get all services data with pagination
   */
  @Get()
  async findAll(@Query() query: PaginationServices): Promise<IService[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    const [error, data] = await to(
      this.servicesService.findAll({ skip: limit * page, take: limit }),
    );

    if (error) {
      throw new NotFoundException(error.message);
    }

    return data;
  }

  /**
   * Get a service by Category ID
   */
  @Get('/bycategory/:idCategory')
  async findByCategory(
    @Param('idCategory', ParseIntPipe) idCategory: number,
    @Query() @Query() query: PaginationServices,
  ): Promise<IService[]> {
    if (!idCategory)
      throw new BadRequestException('El id de la categoria debe ser enviado');

    const [error, serviceData] = await to(
      this.servicesService.findByCategory(idCategory, query),
    );

    if (error || !serviceData || serviceData.length === 0) {
      const messsage = error
        ? error.message
        : 'No existen servicios para esa categoria';
      throw new NotFoundException(messsage);
    }

    return serviceData;
  }

  /**
   * Create a service and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @UsePipes(new JoiValidationPipe(createServiceSchema))
  async create(@Body() createServiceDto: CreateServiceDto) {
    const [error, serviceCreated] = await to(
      this.servicesService.create(createServiceDto),
    );
    console.log(error, serviceCreated);
    if (error) {
      throw new NotFoundException(error.message);
    }

    return { message: 'Servicio creado exitosamente', serviceCreated };
  }

  /**
   * Create a user and validate body data with JOI
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('update/:idService')
  async update(
    @Param('idService', ParseIntPipe) idService: number,
    @Body(new JoiValidationPipe(updateServiceSchema))
    updateServiceDto: UpdateServiceDto,
  ) {
    if (!updateServiceDto)
      throw new BadRequestException(
        'Los datos a actualizar del servicio deben ser enviados',
      );
    if (!idService)
      throw new BadRequestException('El id de servicio debe ser enviado');

    const [error, serviceData] = await to(
      this.servicesService.update(idService, updateServiceDto),
    );
    console.log(error, serviceData);
    if (error) {
      throw new NotFoundException(error.message);
    }

    return {
      message: 'El servicio ha sido actualizado exitosamente',
      serviceData,
    };
  }

  /**
   * Delete service by Id
   */
  @hasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('delete/:idService')
  async delete(
    @Param('idService', ParseIntPipe) idService: number,
  ): Promise<void> {
    if (!idService)
      throw new BadRequestException('El id de servicio debe ser enviado');

    const [error] = await to(this.servicesService.delete(idService));

    if (error) {
      throw new NotFoundException(error.message);
    }
  }
}
