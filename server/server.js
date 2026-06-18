const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// STEP 6: Multer configuration

const upload = multer({ dest: "uploads/" });

// test route
app.get("/", (req, res) => {
  res.send("File Metadata Microservice Running");
});

// upload API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "No file uploaded" });
    }

    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});