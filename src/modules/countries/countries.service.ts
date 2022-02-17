import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'yustii-backend-common/dist/models/countries/countries.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  findAll(query: FindManyOptions<Country>): Promise<ICountry[]> {
    return this.countryRepository.find(query);
  }

  create(country: Country): Promise<ICountry> {
    return this.countryRepository.save(country);
  }

  async update(idCountry: number, country: Country): Promise<ICountry> {
    const countrySave = await this.countryRepository.update(idCountry, country);

    if (!countrySave) throw new NotFoundException();

    return this.countryRepository.findOne(idCountry);
  }

  delete(idCountry: number): Promise<DeleteResult> {
    return this.countryRepository.softDelete(idCountry);
  }
}
