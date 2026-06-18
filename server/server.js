const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// STEP 6: Multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// test route
app.get("/", (req, res) => {
  res.send("File Metadata Microservice Running");
});

// upload API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.json({ error: "No file uploaded" });
    }

    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});