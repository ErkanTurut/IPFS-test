const { create } = require("ipfs-http-client");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const ipfs = create();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  const fileName = req.body.fileName;
  const filePath = "files/" + fileName;
  //console.log(req);

  file.mv(filePath, async (err) => {
    if (err) {
      console.log("Error: failed to download the file");
      return res.status(500).send(err);
    }
    //console.log(filePath);
    const fileHash = await addFile(fileName, filePath);

    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });

    res.render("upload", { fileName, fileHash });
  });
});

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  //console.log(file);
  const fileAdded = await ipfs.add({ path: fileName, content: file });
  //console.log(fileAdded);
  const fileHash = fileAdded.cid;

  return fileHash;
};

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
