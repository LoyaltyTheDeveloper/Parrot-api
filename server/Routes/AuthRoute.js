const { Signup, Signin } = require("../Controllers/AuthController");
const { getAllComments} = require('../Controllers/AuthController');
const { uploadComment} = require('../Controllers/AuthController');
const router = require("express").Router();
const { requireAuth } = require('../Middlewares/AuthMiddleware');

router.post('/signup', Signup);
router.post('/signin', Signin);

// get comment controller
router.get('/getallcomments', getAllComments);
router.post('/uploadcomment', requireAuth, uploadComment);
module.exports = router;