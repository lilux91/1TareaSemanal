const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const findRepairs = catchAsync(async (req, res, next) => {
  // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS PENDING
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      // todo: listo las reparaciones con todos los estados posibles
      status: 'pending',
    },
    include: [{ model: User }],
  });

  //attributes :{ exclude:[ 'createdAt, 'updatedAt,]},
  // where: {status: 'pending},
  //include: [{model: User,
  //attributes: ['id', 'date', 'userId]}]

  // 2. ENVIAR UNA RESPUESTA AL USUARIO
  return res.status(200).json({
    status: 'success',
    repairs,
  });
});

const findRepair = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;

  // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  // 4. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(200).json({
    status: 'success',
    repair,
  });
});

const createRepair = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { date, userId } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const repair = await Repair.create({
    date: date.toLowerCase(),
    userId, //client or employee
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'Pending',
    repair,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;

  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA PENDING
  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  const status = 'completed';
  await repair.update({ status });

  // 3. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Repair updated successfully',
  });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  // 3. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  const status = 'cancelled';
  await repair.update({ status });
  // 4. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Repair deleted successfully',
  });
});

module.exports = {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
};
