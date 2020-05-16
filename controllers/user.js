const { User, Recipe } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
    static signUp(req, res, next) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            profile_picture: '',
            bio: '',
            location: ''
        })
            .then(newUser => {
                const payload = { id: newUser.id, name: newUser.name, email: newUser.email };
                const token = generateToken(payload);
                res.status(201).json({
                    token,
                    id: newUser.id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    profile_picture: newUser.profile_picture,
                    email: newUser.email,
                    bio: newUser.bio,
                    location: newUser.location
                });
            })
            .catch(err => {
                next(err)
            })
    }

    static signIn(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {

                if (user) {
                    let passwordMatched = comparePassword(req.body.password, user.password);
                    console.log(passwordMatched);
                    console.log(req.body.password);
                    console.log(user.password);

                    if (passwordMatched) {

                        const payload = { id: user.id, name: user.name, email: user.email };
                        const token = generateToken(payload);
                        res.status(200).json({
                            token,
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            profile_picture: user.profile_picture,
                            email: user.email,
                            bio: user.bio,
                            location: user.location
                        });
                    } else {
                        next({
                            status: 400,
                            message: 'Invalid email/password'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Invalid email/password'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        const { id } = req.params;
        let finalResult = {};
        User.findOne({
            where: {
                id
            }
        })
            .then(user => {
                if (user) {
                    finalResult.user = user;
                    return Recipe.findAll({
                        where: {
                            UserId: id
                        },
                        order: [['updatedAt', 'DESC']],
                    })
                } else {
                    next({
                        status: 404,
                        message: 'User Not Found'
                    })
                }
            })
            .then(recipes => {
                finalResult.userRecipe = recipes;
                res.status(200).json(finalResult);
            })
            .catch(err => next(err))
    }

    static editProfile(req, res, next) {
        const { first_name, last_name, profile_picture, bio, location } = req.body;
        User.findOne({
            where: {
                id: req.currentUserId
            }
        })
            .then(user => {
                if (user) {
                    User.update({
                        first_name,
                        last_name,
                        profile_picture,
                        bio,
                        location
                    }, {
                        where: {
                            id: user.id
                        },
                        returning: true
                    })
                        .then(updatedUser => res.status(200).json(updatedUser[1][0]))
                } else {
                    next({
                        status: 404,
                        message: 'User Not Found'
                    })
                }
            })
            .catch(err => next(err))
    }
}

module.exports = UserController;