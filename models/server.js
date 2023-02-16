const express = require('express');
const { repairRouter } = require('../routes/repair.routes');
const cors = require('cors');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
const morgan = require('morgan');
const { categoriesRouter } = require('../routes/category.routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const { authRouter } = require('../routes/auth.routes');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./initModels');

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 5000;

    this.limiter = rateLimit({
      max: 100,
      window: 60 * 60 * 1000,
      message: 'Too many request from this IP, please try again in an hour!',
    });

    //defino un objeto
    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
      categories: '/api/v1/categories',
      auth: '/api/v1/auth',
    };
    //connect to db
    this.database();
    //Middelwares siempre encima de las rutas
    this.middlewares();

    this.routes();
  }
  //Me permite trabajar con json en el servidor
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      //console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }
    this.app.use('/api/v1', this.limiter);

    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //this.app.use(this.paths.products, productRouter);

    //utilizar las rutas de autenticacion
    this.app.use(this.paths.auth, authRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.users, usersRouter);
    //utilizar las rutas de users
    this.app.use(this.paths.repairs, repairRouter);
    //utilizar las rutas de categorias
    this.app.use(this.paths.categories, categoriesRouter);

    //LLAMAR LA FUNCIÓN QUE CAPTURE LAS RUTAS NO ESTABLECIDAS PARA ENVIAR UN ERROR
    //DE QUE ESA RUTA NO HA SIDO ENCONTRADA

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    //LLAMAR AL MIDDLEWARE DEL MANEJO DE ERRORES
    this.app.use(globalErrorHandler);
  }
  //{force:true} jamas!!
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    initModel();
    //relations

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in port', this.port);
    });
  }
}

//2. Exportamos el servidor
module.exports = Server;
