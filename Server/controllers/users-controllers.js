// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password'); 
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        console.log("Fetching users failed, please try again later", err.message);
        return next(error);
    }
    // res.json({users: DUMMY_USER})
    res.json({users: users.map(user => user.toObject( {getters: true }))})
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        console.log("signup validation failed: ", errors.array()); // print the specific validation errors
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        );
    }


    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return next(
                new HttpError('User exists already, please login instead.', 422)
            );
        }

        let hashedPassword;

        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            const error = new HttpError(
                'Could not create user, please try again',
                500
            );
            console.log("Could not create user, please try again: ", err.message);
            return next(error);
        }
        
        const createdUser = new User({
            username,
            email,
            image: req.file.path, // replace with valid URL
            password: hashedPassword,
            places: [],
        });

        await createdUser.save();
        ///
        let token;
        try {
            token = jwt.sign(
                { userId: createdUser.id, email: createdUser.email }, 
                'supersecret_dont_share', 
                { expiresIn: '1h' });

        } catch (err) {
            const error = new HttpError(
                'Logging in failed, please try again later',
                500
            );
            console.log("Logging in after signup failed, please try again later: ", err.message);
            return next(error);
        } 

        ///

        res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
    } catch (err) {
        console.error(err); // Log the detailed error
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        console.log("Signing up failed, please try again: ", err.message);
        return next(error);
    }


};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        console.log('Logging in failed, please try again later: ', err.message);
        return next(error);
    }


    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        console.log("Invalid credentials, could not log you in", error.message);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again',
            500
        );
        console.log('Could not log you in, please check your credentials and try again: ', err.message);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        console.log("Invalid credentials, could not log you in: ", error.message);
        return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
      });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;


