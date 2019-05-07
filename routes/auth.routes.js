const Router = require('express').Router();
const loginService = require('../services/login.service');
const signupService = require('../services/signup.service');
Router.get('/login', loginService.getLogin );

Router.get('/signup', signupService.getSignUp);

Router.post('/login', loginService.postLogin);

Router.post('/signup', signupService.postSignup);

module.exports = Router;