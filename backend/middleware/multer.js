import multer from "multer";

//craeting a multer middleware for a file upload

const storage = multer.diskStorage({
  filename: function (re, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
