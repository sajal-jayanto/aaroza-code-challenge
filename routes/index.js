const router = require('express').Router();
const authenticated = require('./authorizebytoken');
const IndexController = require('../controllers/Indexcontroller');




router.get('/actors' , IndexController.get_all_actor);
router.get('/movies'  , authenticated , IndexController.get_all_movies);


router.post('/actors' , authenticated , IndexController.add_an_actor);
router.post('/movies'   , authenticated , IndexController.add_a_movie);




module.exports = router;