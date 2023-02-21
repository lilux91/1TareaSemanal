const { Router } = require('express');
const { check } = require('express-validator');
const {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validRepairById } = require('../middlewares/repairs.middlewares');
const { validRoleUserEmployee } = require('../middlewares/user.middlewares');

const router = Router();

router.get('/', protect, validRoleUserEmployee, findRepairs);

router.get('/:id', protect, validRoleUserEmployee, validRepairById, findRepair);

router.post('/', protect, validRoleUserEmployee, createRepair);

router.patch(
  '/:id',
  protect,
  validRoleUserEmployee,
  validRepairById,
  updateRepair
);

router.delete(
  '/:id',
  protect,
  validRoleUserEmployee,
  validRepairById,
  deleteRepair
);

module.exports = {
  repairRouter: router,
};
