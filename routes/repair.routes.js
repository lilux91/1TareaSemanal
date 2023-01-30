const { Router } = require('express');
const {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = Router();

router.get('/', findRepairs);

router.get('/:id', findRepair);

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairRouter: router,
};
