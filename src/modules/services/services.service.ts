import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'yustii-backend-common/dist/models/services/services.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { PaginationServices } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  create(category: Service): Promise<IService> {
    return this.serviceRepository.save(category);
  }

  findAll(query: FindManyOptions<Service>): Promise<IService[]> {
    return this.serviceRepository.find(query);
  }

  findByCategory(
    idCategory: number,
    query: PaginationServices,
  ): Promise<IService[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    return this.serviceRepository.find({
      where: { idCategory },
      skip: limit * page,
      take: limit,
    });
  }

  async update(idService: number, service: Service): Promise<IService> {
    const serviceSave = await this.serviceRepository.update(idService, service);

    if (!serviceSave) throw new NotFoundException();

    return this.serviceRepository.findOne(idService);
  }

  delete(idService: number): Promise<DeleteResult> {
    return this.serviceRepository.softDelete(idService);
  }
}
