const router = require('express').Router();


const UserController = require('../controllers/UserController');

router.post('/signup' , UserController.add_a_user);
router.post('/login' , UserController.login_a_user);

module.exports = router;