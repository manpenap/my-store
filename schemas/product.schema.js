const Joi = require('joi');//JOI es una API que permite validar datos para nuestro servidor

//CREAMOS CADA CAMPO DEL LOS REQUIRIDOS EN PRODUCTOS, detallando el tipo de entrada
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//ahora se crean los esquemas de datos para cada servicio
const createProductSchema = Joi.object({
  name: name.required(), // especificamos que es un campo requerido
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(), // especificamos que es un campo requerido
});


module.exports = { createProductSchema, updateProductSchema, getProductSchema}
