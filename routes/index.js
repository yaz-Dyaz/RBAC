const express = require('express');
const router = express.Router();
const user = require('./user');
const modules = require('./module');
const role = require('./role');
const roleaccess = require('./roleaccess');

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      message: "Welcome at Home Page!!"
    });
});

router.use('/auth/', user);
router.use('/rbac/module', modules);
router.use('/rbac/roles', role);
router.use('/rbac/roleaccess', roleaccess);

module.exports = router;