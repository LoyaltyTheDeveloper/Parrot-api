// const multer = require('multer');
// const Comment = require("../Models/commentModel");
// const fs = require('fs');
// const path = require('path');

// module.exports.uploadComment = async (req, res, next) => {
//     try {
//       const { organization, review } = req.body;

//       const comment = await Comment.create({ organization, review })
      
//       res.status(201).json({ message: "Comment uploaded successfully", success: true })
//       next();
//     } catch (error) {
//       console.error(error);
//     }
//   };


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
//   };
