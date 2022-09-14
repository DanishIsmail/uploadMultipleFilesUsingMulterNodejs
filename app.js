const express = require("express"),
  multer = require("multer"),
  path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });
var multipleUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "media", maxCount: 1 },
]);

app.post("/api/uploadsFilesToServer", multipleUpload, (req, res) => {
  if (req.files) {
    // console.log(req.files.avatar[0].originalname);
    // console.log(req.files.media[0].originalname);
    console.log(req.files);
    console.log("files uploaded");
  }
  res.send("upload successfully");
});

const port = process.env.PORT || 8000;
app.listen(port, console.log(`running on port ${port}`));
