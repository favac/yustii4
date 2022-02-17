import * as joi from 'joi';

export const createCountrySchema = joi.object({
  name: joi
    .string()
    .required()
    .error(new Error('El nombre del país es requerido y debe ser solo texto')),
  isoCode: joi.string().error(new Error('En el isoCode se espera solo texto')),
});

export const updateCountrySchema = joi.object({
  name: joi.string().error(new Error('El nombre del país debe ser solo texto')),
  isoCode: joi.string().error(new Error('En el isoCode se espera solo texto')),
});

export const paginationCountrySchema = joi.object({
  limit: joi.number().error(new Error('El limite debe ser solo números')),
  page: joi.number().error(new Error('La pagina debe ser solo números')),
});
