const express = require('express');
const router = express.Router();
const user = require('./user');
const module = require('./module');
const role = require('./role');

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      message: "Welcome at Home Page!!"
    });
});

router.use('/auth/', user);
router.use('/module', module);
router.use('/role', role);

module.exports = router;