const upload = require("../middleware/upload");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    console.log(req.file);
    if (req.file == undefined) {
      return res.send("Please select a file");
    }
    return res.send("Image has been uploaded!");
  } catch (error) {
    console.log(error);
    return res.send(`errror while uploading image: ${error}`);
  }
};

module.exports = {
  uploadFile: uploadFile
};
