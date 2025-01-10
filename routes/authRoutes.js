const express = require('express');
const { signupUser, loginUser, getCompanyName } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/getcompanyname', getCompanyName );


module.exports = router;
