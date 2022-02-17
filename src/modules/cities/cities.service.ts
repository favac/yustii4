import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'yustii-backend-common/dist/models/cities/cities.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { PaginationCities } from './cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  create(city: City): Promise<ICity> {
    return this.cityRepository.save(city);
  }

  findAll(query: FindManyOptions<City>): Promise<ICity[]> {
    return this.cityRepository.find(query);
  }

  findByCountry(idCountry: number, query: PaginationCities): Promise<ICity[]> {
    const page = query.page || 0;
    const limit = query.limit || 100;

    return this.cityRepository.find({
      where: { idCountry },
      skip: limit * page,
      take: limit,
    });
  }

  async update(idCity: number, city: City): Promise<ICity> {
    const updatedResult = await this.cityRepository.update(idCity, city);

    if (!updatedResult)
      throw new NotFoundException('La ciudad no ha sido encontrada');

    return this.cityRepository.findOne(idCity);
  }

  delete(idCity: number): Promise<DeleteResult> {
    return this.cityRepository.softDelete(idCity);
  }
}
