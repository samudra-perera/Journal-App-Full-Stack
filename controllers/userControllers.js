const User = require('../model/user')

const signup = async(req, res, next) => {
    const {name, screenName, email, password} = req.body    //Destructure the req.body for cleaner code 
    let existingUser;

    try {
        existingUser = await User.findOne({email: email});  //Finds if there is already a user with that same email 
    } catch (error) {
        console.log(error)
    }
    if(existingUser) {  //if that user exists, return the status 404
        return res.status(400).json({message: "User Already Exists Login Instead"})
    }

    const user = new User({ //Creating a new instance of the User model
        userName: name,
        screenName: screenName,
        email: email,
        password: password,
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({message:user})
}

exports.signup = signup