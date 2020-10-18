//util in Node.js: it is a module that provides fuctions to print formated strings to help the debugging purpose

const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
require("dotenv").config();

//create new storage

const url = process.env.ATLAS_URI;
const storage = new GridFsStorage({
  url,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },

  file: (req, file) => {
    const match = ["image.png", "image.jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      //what is mimtype?
      const filename = `${Date.now()}-syeda-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now}-syeda-${file.originalname}`
    };
  }
});

// file is a function to control the file storage in the database.
// properties of file are such as: filename, metadata, chunkSize, bucketName, contentType…
// check if the file is an image or not using file.mimetype
// to stop duplicating same file in db add prefixer [timestamp]-syeda
//bucketName indicates that the file will be stored at photos.chunks and photos.files collections.

const uploadFile = multer({ storage: storage }).single("file");
//multer module to initialize middleware
//The single() function with the parameter is the name of input tag (in html view: <input type="file" name="file">) will store the single file in req.file.
//for more info: https://bezkoder.com/node-js-upload-resize-multiple-images/
const uploadFileMiddleware = util.promisify(uploadFile); //what is promisify??
//util.promisify() to make the exported middleware object can be used with async-await.

module.exports = uploadFileMiddleware;
