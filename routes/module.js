const express = require('express');
const router = express.Router();
const { modules } = require('../controllers');

router.get('/', modules.index);
router.get('/:id', modules.show);
router.post('/', modules.store);
router.put('/:id', modules.update);
router.delete('/:id', modules.destroy);

module.exports = router;