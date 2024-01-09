var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
