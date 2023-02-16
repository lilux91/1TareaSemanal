const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validCategoryById } = require('../middlewares/category.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.get('/', findCategories);

router.get('/:id', validCategoryById, findCategory);

router.post('/', createCategory);

router.patch('/:id', updateCategory);

router.delete('/:id', deleteCategory);

// router.post(
//   '/',
//   [
//     check('name', 'The name is required').not().isEmpty(),

//     validateFields,
//     protect,
//   ],
//   createCategory
// );

// router.patch(
//   '/:id',
//   [
//     check('name', 'The name is required').not().isEmpty(),
//     validateFields,
//     validCategoryById,
//   ],
//   updateCategory
// );

// router.delete('/:id', validCategoryById, deleteCategory);

module.exports = {
  categoriesRouter: router,
};
