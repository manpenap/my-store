const express = require("express");// se llama o requiere a Express

const ProductsServices = require('./../services/product.service');// ./../sirve para ir atrás en un directorio dentro del proyecto
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router(); // se crea un router con express propio para esta ruta (y no una app), en este caso se está trabajando con la metolodología de separación de responsabilidaddes
const service = new ProductsServices(); //en est archivo de ruta se crea una instancia del producto servicio


router.get('/', async (req,res) =>{// ejemplo de la respuesta con un archivo JSON // se agrega asyn y await dado que los servicios deben trabajar con asincronismo dado que en la vida real se extrae datos desde servidores externos
/* TODO ESTE CÓDIGO SE SEPARÓ YA QUE CORRESPONDE A UN SERVICIO
const products = [];//generar un array de productos generados deon Faker
  const { size } = req.query;//integración de un query al endpoints
  const limit = size || 10;//establecer limit y si no se presenta se predetermina un valor de 10
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  } */

  const products = await service.find(); //se llama al método de la clase ProductsService para completar el array de productos
  res.json(products)//devolver el array como un archivo json
});

router.get('/filter',(req,res)=>{ // Filter es una consulta especifica por lo que en el código debe ir antes de las consultas dinámicas (como lo es :id), si se agrega despues, tomará la palabra filter como un Id a consultar
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema,'params'), //invocamos al validador
  async (req,res,next) =>{// ejemplo de la respuesta al buscar con un parámetro (ej id)

    try {
      const { id } = req.params; //req.params permite rescatar un parámetro del requerimiento, en ejemplo se buscar el id.
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }



/*  TODO ESTE CÓDIGO SE SEPARÓ YA QUE CORRESPONDE A UN SERVICIO
  if(id === '999'){//NOTA: todos los parámetros recibidos por parámetro (tipo :ID) o query, los recibirá como string, por eso en este ejemplo el número se encierra entre comillas
    res.status(404).json({// este If es un ejemplo de como manejar los status que respondemos
      message:'not found'
    });
  } else {
    res.status(200).json({
        id,
        name:'Product 1',
        price: 1900
    })
  } */
});

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{ // forma para aplicar el método post, el que permite recibir información enviado por el usuario
    const body = req.body; //la información vienen contenida en un Body
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);

  /* TODO ESTE CÓDIGO SE SEPARÓ YA QUE CORRESPONDE A UN SERVICIO
    res.status(201).json({ //.status(201) es opcional, y se utiliza para personalizar los status de las respuestas
      message:'created',
      data:body
    }) */
  })

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res,next)=>{ // el método patch permite actualizar algún dato de un registro asociado a un id (con método PUT se debe ingresar todos los campos). Se agrega  next para usar el middleware de errores
    try {//ahora que son asincronas las funciones se puede utilizar try-catch para el manejo de errores
      const {id} = req.params; //rescatamos el registro del id que queremos actualizar
      const body = req.body; //la información vienen contenida en un Body
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }


  })

router.delete('/:id',async (req,res)=>{ // el método delete permite borrar un registro asociado a un ID
  const {id} = req.params; //rescatamos el registro del id que queremos actualizar
  const rta = await service.delete(id);
  res.json(rta)
})

module.exports = router; // se exporta la ruta para poder utilizarla en la app
