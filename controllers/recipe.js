const { Recipe, User } = require('../models');

class RecipeController {
    static findAll(req, res, next) {
        console.log(req.query, ['< < < < QUERY']);
        
        Recipe.findAll({
            order: [['updatedAt', 'DESC']],
            include: ['User']
        })
            .then(recipes => res.status(200).json(recipes))
            .catch(err => next(err))
    }

    static findOne(req, res, next) {
        Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: ['User']
        })
            .then(recipe => {
                if (recipe) {
                    res.status(200).json(recipe)
                } else {
                    next({
                        status: 404,
                        message: 'Recipe not found'
                    })
                }
            })
            .catch(err => next(err))
    }

    static findAllByUserId(req, res, next) {
        Recipe.findAll({
            where: {
                UserId: req.params.userid
            },
            order: [['updatedAt', 'DESC']],
            include: ['User']
        })
            .then(recipes => res.status(200).json(recipes))
            .catch(err => next(err))
    }

    static add(req, res, next) {
        const { title, story, serving, ingredients, cooking_duration, steps, thumbnail } = req.body
        Recipe.create({
            title,
            story,
            serving,
            ingredients,
            cooking_duration,
            steps,
            thumbnail,
            UserId: req.currentUserId
        })
            .then(newRecipe => res.status(201).json(newRecipe))
            .catch(err => next(err))
    }

    static update(req, res, next) {
        const { title, story, serving, ingredients, cooking_duration, steps, thumbnail } = req.body
        Recipe.update({
            title,
            story,
            serving,
            ingredients,
            cooking_duration,
            steps,
            thumbnail
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(updatedRecipe => res.status(200).json(updatedRecipe[1][0]))
            .catch(err => next(err))
    }

    static delete(req, res, next) {
        let id = req.params.id;
        let deletedRecipe;
        Recipe.findByPk(id)
            .then(recipe => {
                if (recipe) {
                    deletedRecipe = recipe
                    Recipe.destroy({
                        where: {
                            id
                        }
                    })
                        .then(_ => res.status(200).json(deletedRecipe))
                        .catch(err => next(err))
                } else {
                    next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => next(err))
    }
}

module.exports = RecipeController;