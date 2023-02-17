const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.findUsers = catchAsync(async (req, res, next) => {
  // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
  const users = await User.findAll({
    //attributes: ['id', 'name', 'email'],
    where: {
      //status: true,
      status: 'available',
    },
  });

  // 2. ENVIAR UNA RESPUESTA AL USUARIO
  return res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { user } = req;

  // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
  // const user = await User.findOne({
  //   where: {
  //     attributes: ['id', 'name', 'email'],
  //     // status: true,
  //     status: 'available',
  //     id,
  //   },
  // });

  // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
  // if (!user) {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'User not found',
  //   });
  // }

  // 4. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, email, password, role } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role, //client or employee
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS

  const { name, email } = req.body;
  const { user } = req;
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY

  // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
  //  await user.update({ name, email });
  const updateUser = await user.update({
    name,
    email,
  });

  // 6. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    updateUser,
  });
  // } catch (error) {
  //   return res.status(500).json({
  //     status: 'fail',
  //     message: 'Internal server error',
});
//}
//};

exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { user } = req;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE

  // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  await user.update({ status: dissabled });
  // 5. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangeAt: new Date(),
  });
  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfylly',
  });
});
