const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const recipesRoutes = require('./recipes');
const usersRoutes = require('./users');

router.get('/', (req, res) => {
    res.json('> > > > Welcome To cook API < < < <')
})

router.use('/users', usersRoutes);
router.use('/recipes', recipesRoutes);

router.use(errorHandler);

module.exports = router
