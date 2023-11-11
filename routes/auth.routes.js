const express = require("express");
const router = express.Router();
const {handleLogin, handleSignup} = require('../controllers/auth.controllers');

router.post('/login', handleLogin);
router.post('/signup', handleSignup);

module.exports = router;