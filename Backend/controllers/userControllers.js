const User = require("../model/user");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const JWT_SECRET_KEY = "MyKey";

const signup = async (req, res, next) => {
  const { userName, screenName, email, password, confirmPassword } = req.body; //Destructure the req.body for cleaner code
  let existingUser;

  try {
    existingUser = await User.findOne(
      { $or: [{ email: email }, { userName: userName }] } //Finds if there is already a user with that same email or username
    );
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    //if that user exists, return the status 404
    return res
      .status(400)
      .json({ message: "User Already Exists Login Instead" });
  }

  if(password !== confirmPassword) {    //Password Validation on the backend
    return res.status(400).json({message: "Passwords do not match"})
  }
  const hashedPassword = bycrypt.hashSync(password);

  const user = new User({
    //Creating a new instance of the User model
    userName: userName,
    screenName: screenName,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log('User Created')
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email }); //Check if the user exists in the database
  } catch (error) {
    return new Error(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" }); //If user does not exist in DB
  }

  const reHashedPassword = bycrypt.compareSync(password, existingUser.password); //comparing the hashed password to check they match
  if (!reHashedPassword) {
    return res.status(400).json({ message: "Invalid Password" }); //if passwords do not match 0
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    //Generating the JWT token
    expiresIn: "30d",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + (60*24*3600000)),
    httpOnly: true,
    sameSite: "lax",
  });

  console.log('User Logged IN')
  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token }); //If passwords match respond with login status
};

const verifyToken = async (req, res, next) => {
  //Token Verfication
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];

  if (!token) {
    res.status(404).json({ message: "No Token found" }); //If token does not exist return status 404
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next(); //Calls the next middleware functon(in this case getUser)
};

const getUser = async (req, res, next) => {
  //Once the token verification is done get the userID
  const userId = req.id; //After the token is verfiied we send the req.id as the userID in the verify token function
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user });
};

const logout = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
  
    if (!token) {
      res.status(404).json({ message: "No Token found" }); //If token does not exist return status 404
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Authenticaton Failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({message: "Successfully Logged Out"})
      });

}

// const refreshToken = async (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[1];
//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldnt find token" });
//   }
//   jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authenticaton Failed" });
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";

//     const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
//       expiresIn: "30d",
//     });

//     res.cookie(String(user.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + (60*24*3600000)),
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     req.id = user.id;
//     next();
//   });
// };

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.logout = logout
// exports.refreshToken = refreshToken;
