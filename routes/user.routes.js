const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const { validIfExistUser } = require('../middlewares/user.middlewares');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

router.post('/', createUser);

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
