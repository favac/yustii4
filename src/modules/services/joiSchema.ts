import * as joi from 'joi';

export const createServiceSchema = joi.object({
  name: joi
    .string()
    .required()
    .error(
      new Error('El nombre del servicio es requerido y debe ser de solo texto'),
    ),
  description: joi
    .string()
    .error(new Error('La description del servicio debe ser de solo texto')),
  isForPersons: joi
    .boolean()
    .required()
    .error(new Error('Es para personas debe ser true o false')),
  isForCompanies: joi
    .boolean()
    .required()
    .error(new Error('Es para empresas debe ser true o false')),
  idCategory: joi
    .number()
    .required()
    .error(
      new Error('El id de la categoria es requerido y debe ser solo númerico'),
    ),
});

export const updateServiceSchema = joi.object({
  name: joi
    .string()
    .error(new Error('El nombre del servicio debe ser de solo texto')),
  description: joi
    .string()
    .error(new Error('La description del servicio debe ser de solo texto')),
  isForPersons: joi
    .boolean()
    .error(new Error('Es para personas debe ser true o false')),
  isForCompanies: joi
    .boolean()
    .error(new Error('Es para empresas debe ser true o false')),
  idCategory: joi
    .number()
    .error(new Error('El id de la categoria debe ser solo númerico')),
});
