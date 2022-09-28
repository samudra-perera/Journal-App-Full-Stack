const User = require('../model/user')
const bycrypt = require('bcryptjs')

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
    return res.status(200).json({message: 'Successfully Logged In'})    //If passwords match respond with login status 
}

exports.signup = signup
exports.login = login