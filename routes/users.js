const router = require('express').Router();
const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/:id', UserController.findOne);
router.put('/', authentication, UserController.editProfile);
router.post('/googleSignIn', UserController.googleSignIn);

module.exports = router
