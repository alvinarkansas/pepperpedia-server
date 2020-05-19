const { Recipe, Cookmark } = require('../models/index');

function recipeAuthorization(req, res, next) {
    console.log(['D E L E T E = = = = = ']);

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

function cookmarkAuthorization(req, res, next) {
    Cookmark.findOne({
        where: {
            RecipeId: req.params.id
        }
    })
        .then(cookmark => {
            if (cookmark) {
                console.log({ params: req.params.id, currentUserId: req.currentUserId, cookmarkUserId: cookmark.UserId });

                if (cookmark.UserId == req.currentUserId) {
                    next()
                } else {
                    res.status(401).json({ status: 401, message: "Authorization failed" })
                }
            } else {
                res.status(401).json({ status: 404, message: "Cookmark not found" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { recipeAuthorization, cookmarkAuthorization };