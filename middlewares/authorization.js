const { Recipe } = require('../models/index');

function authorization(req, res, next) {
    Recipe.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(recipe => {
            if (recipe) {
                console.log({ params: req.params.id, currentUserId: req.currentUserId, recipeUserId: recipe.UserId });

                if (recipe.UserId == req.currentUserId) {
                    next()
                } else {
                    res.status(401).json({ status: 401, message: "Authorization failed" })
                }
            } else {
                res.status(401).json({ status: 404, message: "Recipe not found" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization;