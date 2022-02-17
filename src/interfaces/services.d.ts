import { Category } from 'src/models/categories/categories.entity';

declare global {
  interface IService {
    idService?: number;
    name?: string;
    description?: string;
    isForPersons?: boolean;
    isForCompanies?: boolean;
    idCategory?: Category;
  }
}
