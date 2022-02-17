import * as joi from 'joi';

export const createCategorySchema = joi.object({
  name: joi
    .string()
    .required()
    .error(new Error('En el nombre se espera solo texto y es requerido')),
  description: joi
    .string()
    .error(new Error('En la description se espera solo texto')),
});

export const updateCategorySchema = joi.object({
  name: joi.string().error(new Error('En el nombre se espera solo texto')),
  description: joi
    .string()
    .error(new Error('En la description se espera solo texto')),
});
