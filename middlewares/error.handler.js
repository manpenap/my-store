function logErrors(err,req,res,next){
  console.log(err);
  next(err);// al pasarle el error, se especifica que es un middleware de tipo error, de no pasa nada asumiria que es un middleware normal
}

function errorHandler(err,req,res,next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler(err,req,res,next){
  if(err.isBoom){ // validar si el error es de tipo boom
    const { output } = err; // si es así, boom maneja el detalle del error en un output
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err) // si no es de tipo boom, se le pasa el error para que lo maneje como err normal(funcion de arriba)
  }

}


module.exports = { logErrors, errorHandler, boomErrorHandler}
