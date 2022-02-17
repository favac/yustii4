import * as joi from 'joi';

export const createCitySchema = joi.object({
  name: joi
    .string()
    .required()
    .error(
      new Error('El nombre de la ciudad es requerido y debe ser solo texto'),
    ),
  isoCode: joi.string().error(new Error('En el isoCode se espera solo texto')),
  idCountry: joi
    .number()
    .required()
    .error(new Error('En el id de país se espera solo números')),
});

export const updateCitySchema = joi.object({
  name: joi.string().error(new Error('En el nombre se espera solo texto')),
  isoCode: joi.string().error(new Error('En el isoCode se espera solo texto')),
  idCountry: joi
    .number()
    .error(new Error('En el id de país se espera solo números')),
});
