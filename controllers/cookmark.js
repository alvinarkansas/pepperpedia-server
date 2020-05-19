const { Cookmark } = require('../models');

class CookmarkController {
    static getUserCookmark(req, res, next) {
        Cookmark.findAll({
            where: {
                UserId: req.currentUserId
            },
            include: ['User', 'Recipe']
        })
            .then(cookmarks => {
                cookmarks.map(el => console.log(el.id, ['< < < <']))
                res.status(200).json(cookmarks);
            })
            .catch(err => next(err))
    }

    static addToCookmark(req, res, next) {
        Cookmark.findOne({
            where: {
                RecipeId: req.body.RecipeId,
                UserId: req.currentUserId
            }
        })
            .then(cookmark => {
                if (cookmark) {
                    next({
                        status: 400,
                        message: 'You have added this to your cookmark'
                    })
                } else {
                    return Cookmark.create({
                        UserId: req.currentUserId,
                        RecipeId: req.body.RecipeId
                    })
                }
            })
            .then(newCookmark => {
                res.status(201).json(newCookmark);
            })
            .catch(err => next(err))
    }

    static remove(req, res, next) {
        let id = +req.params.id;
        console.log(['D E L E T E ', { id }]);
        let deletedCookmark;
        Cookmark.findByPk(id)
            .then(cookmark => {
                console.log(cookmark, ['id maybe']);

                if (cookmark) {
                    deletedCookmark = cookmark
                    Cookmark.destroy({
                        where: {
                            id
                        }
                    })
                        .then(_ => res.status(200).json(deletedCookmark))
                        .catch(err => next(err))
                } else {
                    next({
                        status: 404,
                        message: 'Cookmark not found'
                    })
                }
            })
            .catch(err => next(err))
    }
}

module.exports = CookmarkController;