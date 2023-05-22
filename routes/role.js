const express = require('express');
const router = express.Router();
const { role } = require('../controllers');

router.get('/', role.index);
router.get('/:id', role.show);
router.post('/', role.store);
router.put('/:id', role.update);
router.delete('/:id', role.destroy);

module.exports = router;