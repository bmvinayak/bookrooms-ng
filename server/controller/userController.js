const UserModel = require('../model/user');
const mongooseHelper = require('../helpers/mongooseHelper');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

exports.login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({errors: [{title: 'Missing data', detail: 'Please specify email and password'}]});
    }
    UserModel.findOne({email:email}, function(err,validUser){
        if (err) {
            return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
        }
        if (!validUser) {
            return res.status(422).send({errors: [{title: 'Invalid User', detail: 'User doesnt exist'}]});
        } 
        if (validUser.isValidPassword(password)) {
            // return JWT Token 
            const token = jwt.sign({
                userID: validUser.id,
                username: validUser.username
            }, process.env.SECRET, {expiresIn: '1h'});
            return res.json(token);
        } else {
            return res.status(422).send({errors: [{title: 'Wrong Credentials', detail: 'Wrong email id or password'}]});
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
        return res.status(422).send({errors: [{title: 'Missing data', detail: 'Please specify email and password'}]});
    }
    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Password Confirmation Mismatch', detail: 'Confirm Password does not match Password'}]});
    }
    UserModel.findOne({email:email}, function(err,emailAlreadyRegistered){
        if (err) {
            return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
        }
        if (emailAlreadyRegistered) {
            return res.status(422).send({errors: [{title: 'Email Registered', detail: 'Email already registered'}]});
        } 
        const user = new UserModel({
            username: username,
            email: email,
            password: passwordConfirmation
        });
        user.save(function (err) {
            if (err) {
                return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
            } 
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
                    return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
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
        return jwt.verify(token.split(' ')[1],process.env.SECRET)   
    } catch (e) {
        return null;
    };
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login to get access'}]});
}