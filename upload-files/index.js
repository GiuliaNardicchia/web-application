const express = require('express');
const http = require('http');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const dir = '../files';

var fileModel = '';

app.use(express.static("files"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname.toString()=='model') {
      fileModel = path.parse(file.originalname).name ;
      cb(null, dir)
    } else {
      var directory = dir + '/' + fileModel;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      cb(null, directory);
    }
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
})

var upload = multer({ storage: storage });
var multipleUpload = upload.fields([{ name: 'model' }, { name: 'dicom' }]);

app.get("/", (req, res) => {
  res.sendFile('upload_files.html', {root: __dirname + "/views"});
})

app.post("/uploadfile", multipleUpload, (req, res) => {
  if (req.files) {    
    console.log('files uploaded');
    console.log(req.files);
    res.send("Upload file success");
  }
})

app.get("/*", (req, res) => {
  res.send("<h1>404 - Page not found.</h1>");
})

server.listen(port, () => console.log(`[SERVER STARTED] ${server.address().port}`));