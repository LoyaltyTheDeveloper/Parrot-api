const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Comment = require("../Models/commentModel");
require("dotenv").config();

const createSecretToken = ({_id, userName, email}) => {  
  return jwt.sign({_id, userName, email}, process.env.TOKEN_KEY, { 
    expiresIn: '30d',
  });
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports.Signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, userName, phone, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ message: "Email already in use. Please use another email" });
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.json({ message: "Username is not available. Please use another username" });
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
        return res.json({ message: "You cannot use a phone number more than once." });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (userName.length > 10) {
        return res.json({ message: "Username cannot be more than 10 characters long." });
      }
  
    const user = await User.create({ firstName, lastName, email, userName, phone, password });
    
    const token = createSecretToken(user._id)
    
    res.status(201).json({ message: "User signed up successfully", success: true, token });
    next();
  }
  catch (error) {
    console.error(error);
  }
};

module.exports.uploadComment = async (req, res, next) => {
  try{
  const { organization, review } = req.body;
  const {_id} = req.user;
  const comment = await Comment.create({ organization, review, user:_id })
  
  res.status(201).json({ message: "Comment uploaded successfully", success: true, comment})
  next();
}
catch (error) {
  throw error
}
};

module.exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("user", "firstName userName");
    
    res.status(200).json({ success: true, comments });
    next();
  } catch (error) {
    console.error(error);
  }
};

 
module.exports.Signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      const token = createSecretToken({_id:user._id, userName:user.userName, email:user.email})    //_id:user._id, email: user.email 
       res.status(200).json({ message: "User signed in successfully", success: true, token, userName: user.userName});      // userName: user.userName, userId: user._id
       next()
    } catch (error) {
      console.error(error);
    }
  }

  //   module.exports.getUserComments = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const comment = await Comment.findById({id});
      
//       res.status(200).json({ success: true, organization: comment.organization, review: comment.review });
//       next();
//     } catch (error) {
//       console.error(error);
//     }
//   };



//   module.exports.editComment = async (req, res, next) => {
//     try {
//       const { review } = req.body;
//       if(!review ){
//         return res.json({message:'You did not update this comment'})
//       }
//       const { id } = req.params;
//       const updatedComment = await Comment.findByIdAndUpdate(id, req.body);
      
//       res.status(200).json({ message: "Comment updated successfully", success: true, review: updatedComment.review });
//       next();
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   module.exports.deleteComment = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const comment = await Comment.findByIdAndDelete(id);
      
//       if(!comment){
//         return res.status(404).json({message: "An error occured"});
//       }
//       res.status(200).json({ message: "Comment deleted successfully"});
//       next();
//     } catch (error) {
//       console.error(error);
//     }