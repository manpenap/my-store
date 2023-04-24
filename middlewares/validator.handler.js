const boom = require('@hapi/boom');


//se crea el middleware para manejar el esquema de Joi
function validatorHandler(schema, property){ // se inicia una función
  return(req, res, next)=>{ // que retorna un clousure, que es el middleware como tal
    const data = req[property]; // en property se recoge todas las opciones del requerimiento, que pudiera ser un req.params, req.query, req.body

    const { error } = schema.validate(data, { abortEarly: false }); // para constatar si existe un error se utiliza la propiedad validate del schema y se le pasa la data ; con abortEarly hacemos que Joi informe todos los errores enseguida, y no de a uno
    if(error){//si existe el error...
      next(boom.badRequest(error)); // si la información presenta error, se envía al middleware que maneja el error
    }
    next();
  }
}

module.exports = validatorHandler;
