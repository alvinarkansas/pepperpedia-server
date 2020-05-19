const router = require('express').Router();
const CookmarkController = require('../controllers/cookmark');
const authentication = require('../middlewares/authentication');
const { cookmarkAuthorization } = require('../middlewares/authorization');

router.get('/', authentication, CookmarkController.getUserCookmark);
router.post('/', authentication, CookmarkController.addToCookmark);
router.post('/check', authentication, CookmarkController.check);
router.use(authentication);
router.delete('/:id', cookmarkAuthorization, CookmarkController.remove);

module.exports = router
