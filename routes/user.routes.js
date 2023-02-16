const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  //createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const { validIfExistUser } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

//router.post('/', createUser);

router.patch(
  '/:id',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validIfExistUser,
  ],
  updateUser
);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
