const express = require('express');

const productsRouter = require('./products.router'); // se importa las rutas de los endpoints products

function routerApi(app){// funcion para invocar a la app
  const router = express.Router(); // se crea un router con express para el manejo de versiones
  app.use('/api/v1',router);//se asigna el 'path'(ruta) al router recién creado y se utiliza para concatenar con los otros endpoint (ejemplo productos)
  router.use('/products',productsRouter);
}

module.exports = routerApi;
