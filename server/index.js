const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;


mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
    cors({
      origin: ["http://127.0.0.1:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


  // stupid code
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, 'uploads/'); 
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, Date.now() + '-' + file.originalname); 
  //   },
  // });
  // const upload = multer({ storage: storage });

  // app.post('/uploadimage', upload.single('images'), (req, res) => {
  //   if(!req.file){
  //     return res.status(400).json({error: 'No file'});
  //   }
  //   res.status(200).json({
  //     message: 'File uploaded successfully',
  //     filename: req.file.filename,
  //   })
  // })

  // app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
  
  app.use(cookieParser());

  app.use(express.json());

  app.use("/", authRoute);

  // app.use("/api", uploadRoutes);