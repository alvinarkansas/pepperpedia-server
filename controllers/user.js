const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
    static signUp(req, res, next) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            profile_picture: req.body.profile_picture,
        })
            .then(newUser => {
                const payload = { id: newUser.id, name: newUser.name, email: newUser.email };
                const token = generateToken(payload);
                res.status(201).json({ 
                    token, 
                    first_name: newUser.first_name ,
                    last_name: newUser.last_name,
                    profile_picture: newUser.profile_picture
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
                            first_name: user.first_name ,
                            last_name: user.last_name,
                            profile_picture: user.profile_picture
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
}

module.exports = UserController;