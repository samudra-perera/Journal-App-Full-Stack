const User = require('../model/user')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'MyKey'

const signup = async(req, res, next) => {
    const {name, screenName, email, password} = req.body    //Destructure the req.body for cleaner code 
    let existingUser;

    try {
        existingUser = await User.findOne(
            { $or: [{ email: email }, { userName: name }] }
        );  //Finds if there is already a user with that same email 
    } catch (error) {
        console.log(error)
    }
    if(existingUser) {  //if that user exists, return the status 404
        return res.status(400).json({message: "User Already Exists Login Instead"})
    }

    const hashedPassword = bycrypt.hashSync(password)

    const user = new User({ //Creating a new instance of the User model
        userName: name,
        screenName: screenName,
        email: email,
        password: hashedPassword,
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({message:user})
}

const login = async(req, res, next) => {
    const {email, password} = req.body
    let existingUser;

    try {
        existingUser = await User.findOne({email: email})   //Check if the user exists in the database
    } catch (error) {
        return new Error(error)
    }
    if(!existingUser) {
        return res.status(400).json({message: "User not found. Signup Please"})     //If user does not exist in DB
    }

    const reHashedPassword = bycrypt.compareSync(password, existingUser.password);  //comparing the hashed password to check they match 
    if(!reHashedPassword) {
        return res.status(400).json({message: "Invalid Password"})  //if passwords do not match 0
    }

    const token = jwt.sign({id: existingUser._id}, JWT_SECRET_KEY, {//Generating the JWT token 
        expiresIn: '1hr'    
    })

    return res.status(200).json({message: 'Successfully Logged In', user: existingUser, token})    //If passwords match respond with login status 
}

const verifyToken = async(req, res, next) => {
    const header = req.headers[`authorization`]
    const token = header.split(" ")[1]
    if(!token) {
        res.status(404).json({message: "No Token found"})
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id)
        req.id = user.id
    })
    next();
}

const getUser = async(req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (error) {
        return new Error(error)
    }
    if(!user) {
        return res.status(404).json({message: 'User Not Found'})
    }
    return res.status(200).json({user})
}


exports.signup = signup
exports.login = login
exports.verifyToken = verifyToken
exports.getUser = getUser