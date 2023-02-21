const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  updateUser,
  deleteUser,
  // updatePassword,
} = require('../controllers/users.controller');

const { validIfExistUser } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validOnlyOwner } = require('../middlewares/user.middlewares');

const router = Router();

router.get('/', protect, findUsers);

router.get('/:id', protect, validIfExistUser, findUser);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    protect,
    validIfExistUser,
    validOnlyOwner,
  ],
  updateUser
);

router.delete('/:id', protect, validIfExistUser, validOnlyOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
