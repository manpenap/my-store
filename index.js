//CONSTRUCCIÓN DE SERVIDOR CON EXPRESS,

// NOTA: Para matar el servidor, en la terminal hay que escribir: pkill node
/*
const express = require("express");// se llama o requiere a Express
const { faker } = require('@faker-js/faker'); // libreria que permite utilizar data fake
const app = express(); // construir la App (siempre se crea una app)
const port = 3000; // indicar donde correrá la App

app.get("/", (req, res) =>{ //se define la ruta con esta formula que lleva un callback
  res.send("Hola mi server en Express");
});

app.get("/nueva-ruta",(req,res) =>{// ejemplo de como se crea una nueva ruta o endpoint
  res.send("hola, soy una nueva ruta");
});


app.get('/products', (req,res) =>{// ejemplo de la respuesta con un archivo JSON
  const products = [];//generar un array de productos mediante Faker
  const { size } = req.query;//integración de un query al endpoints
  const limit = size || 10;//establecer limit y si no se presenta se predetermina un valor de 10
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products)//devolver el array como un archivo json
});

app.get('/products/filter',(req,res)=>{ // Filter es una consulta especifica por lo que en el código debe ir antes de las consultas dinámicas (como lo es :id), si se agrega despues, tomará la palabra filter como un Id a consultar
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req,res) =>{// ejemplo de la respuesta al buscar con un parámetro (ej id)
  const { id } = req.params; //req.params permite rescatar un parámetro del requerimiento, en ejemplo se buscar el id.
  res.json({
    id,
    name:'Product 1',
    price: 1900
  })
});

app.get('/categories/:categoryId/products/:productId', (req,res) =>{// ejemplo de la respuesta al buscar con más de 1 parámetro (ej categoryID y productId)
  const { categoryId, productId } = req.params; // ambos parámemetros son rescatados mediante el método.
  res.json({
    categoryId,
    productId
  })
});

app.get('/users',(req,res)=>{ // Ejemplo del uso de un query
  const { limit, offset } = req.query; // Un query es una consulta que usa otros parámetros de búsqueda, siendo unos de ellos limit y offset
  if (limit && offset ){ // mediante un if validamos que se hayan ingresados los parámetros de la consulta
    res.json({
      limit,
      offset
    });
  } else {
    res.send('no hay parámetros')
  }
});

app.listen(port, () =>{ // acá se ocupa el Listen para definir lo que escucha la ruta
  console.log("My port: " + port);
});
 */

//CONSTRUCCION DEL SERVIDOR USANDO METODOLOGÍA DE SEPARACIÓN DE RESPONSABILIDADES

const express = require('express');
const cors = require('cors'); // se llama cors paa solucionar el problema de accesos
const routerApi = require('./routes') // se invoca al archivo index de la carpeta routes

const {logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000 ; //la última configuración es para poner un puerto dinámco (variable de ambiente) al momento de enviar nuestra app a producción

app.use(express.json()); // Esto se utiliza para poder recibir el body del data enviada por el método post

//MANEJO DE ACCESO
const whitelist = ['https://localhost:8080','https://myapp.co'];//se crea una lista con los dominios que permitiremos hacer request a nuestra api
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors()); // se implementa cors



app.get("/", (req, res) =>{ //se define la ruta con esta formula que lleva un callback
  res.send("Hola mi server en Express");
});



routerApi(app); // se invoca la funcion de index en router y se le pasa la app

app.use(logErrors); //siempre se debe incorporar posterior a la ruta
app.use(boomErrorHandler);
app.use(errorHandler);// también es importante colocarlos de acuerdo al orden en que se están ejecutando

app.listen(port, () =>{ // acá se ocupa el Listen para definir lo que escucha la ruta
  console.log("My port: " + port);
});
