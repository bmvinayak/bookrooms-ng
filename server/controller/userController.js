const UserModel = require('../model/user');
const mongooseHelper = require('../helpers/mongooseHelper');
const jwt = require('jsonwebtoken');
//const config = require('../config');

const dotenv = require("dotenv");

dotenv.config();

exports.login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res
            .sendApiError(
                {
                    title: 'Missing Data',
                    detail: 'Email or Password is missing!'
                });
    }
    UserModel.findOne({email:email}, function(err,validUser){
        if (err) {
            return res.mongoError(error);
        }
        if (!validUser) {
            return res
                .sendApiError(
                    {
                        title: 'Invalid User',
                        detail: "User with given Email doesn't exists"
                    });
        } 
        if (validUser.isValidPassword(password)) {
            // return JWT Token 
            const token = jwt.sign({
                userID: validUser.id,
                username: validUser.username
            }, process.env.SECRET, {expiresIn: '1h'});
            return res.json({"access_token": token});
        } else {
            return res
                .sendApiError(
                    {
                        title: 'Wrong Credentials',
                        detail: "Wrong Email or Password"
                    })
        }

        
    })
}

exports.register = function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    
    //const {username, email, password, passwordConfirmation} = req.body;

    if (!email || !password) {
        return res
            .sendApiError(
                {
                    title: 'Missing Data',
                    detail: 'Email or Password is missing!'
                });
    }
    if (password !== passwordConfirmation) {
        return res
            .sendApiError(
                {
                    title: 'Password Confirmation Mismatch',
                    detail: 'Confirm Password does not match Password!'
                });
    }
    UserModel.findOne({email:email}, function(err,emailAlreadyRegistered){
        if (err) {
            return res.mongoError(error)
        }
        if (emailAlreadyRegistered) {
            return res
                .sendApiError(
                    {
                        title: 'Email already Registered',
                        detail: 'User with provided email already exists!'
                    });
        } 
        const user = new UserModel({
            username: username,
            email: email,
            password: passwordConfirmation
        });
        user.save(function (err) {
            if (err) {
                return res.mongoError(error);
            } 
            // TODO: send -> status: 'registered' 
            return res.json({'registered': true});
            
        })     
    })

}

exports.tokenAuthenticate = function(req,res,next) {
    const token = req.headers.authorization;
    
   if (token){
        const authUser = parseToken(token);
        if (authUser) {
            UserModel.findById(authUser.userID, function(err,validUser){
                if (err) {
                    return res.mongoError(error);
                }
                if (validUser) {
                    res.locals.user = validUser;
                    next();
                } else {
                    notAuthorized(res);
                }
            })
        } else
        {
            notAuthorized(res);
        }
    } else {
        notAuthorized(res);
    }
}

function parseToken(token) {
    try {
        return jwt.verify(token.split(' ')[1], process.env.SECRET)   
    } catch (e) {
        return null;
    };
}

function notAuthorized(res) {
    return res
        .status(401)
        .send({
            errors:
                [{ title: 'Not Authorized!', detail: 'You need to log in to get an access!' }]
        })
}