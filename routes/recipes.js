const router = require('express').Router();
const RecipeController = require('../controllers/recipe');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', RecipeController.findAll);
router.get('/search', RecipeController.search);
router.get('/:id', RecipeController.findOne);
router.get('/by/:userid', RecipeController.findAllByUserId);
router.post('/', authentication, RecipeController.add);
router.use(authentication);
router.put('/:id', authorization, RecipeController.update);
router.delete('/:id', RecipeController.delete)

module.exports = router;
