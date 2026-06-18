const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("File Metadata Microservice Running");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({
      error: "No file uploaded"
    });
  }

  const file = req.file;

  return res.json({
    name: file.originalname,
    type: file.mimetype,
    size: Number(file.size)
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));