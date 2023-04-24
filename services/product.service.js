//Continuando con la metodología de la separación de responsabilidades, se separan los servicios(crear, leer, actualizar y borrar) de las rutas
const { faker } = require('@faker-js/faker');//para crear los datos ficticios
const boom = require('@hapi/boom');

class ProductsServices{//se utiliza programación orientada a objetos, para los cual se crea la clase de productos de servicios
  constructor(){
    this.products = [];//cada vez que se instancé la clase, inicia con un array vacío
    this.generate(); //para que cada vez que se instancé la clase, corra el método generate de la clase
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return this.products; // este método simplemente retorna el array de productos
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id); //método findId para encontrar la posición del producto dentro del array

    if(index === -1){ // si no se encuentre el ID se arroja un error
      //throw new Error('product not found'); //esta sería la forma de manejar el error sin boom
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,//con el spread operator llamados a los datos contenidos en el objetos
      ...changes//y aplicamos los cambios para sobreescribir
    };
    return this.products[index];

  }

  async delete(id){
    const index = this.products.findIndex(item=> item.id = id); //método findId para encontrar la posición del producto dentro del array
    if(index === -1){ // si no se encuentre el ID se arroja un error
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);//el método splice elimina, apartir de la posición (dada por index) la cantidad de elemento determinados, en este caso 1
    return { id };
  }
}

module.exports = ProductsServices;
