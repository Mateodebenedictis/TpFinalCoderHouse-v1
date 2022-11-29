
//Se le pasara una variable admin por parametro. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

const validateAdmin = (admin) => (request, response, next) => {

  const { method, originalUrl } = request;

  const authorized = admin ? true : false;

  if (authorized) {

    next();

  } else {

    response.status(401).json({

      error: -1,
      descripcion: `ruta '${originalUrl}' método '${method}' no autorizada`,
      user: request.user

    });

  }
  
};

module.exports = validateAdmin;