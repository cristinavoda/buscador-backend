

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload-cv", upload.single("cv"), (req, res) => {
  res.json({
    message: "CV uploaded successfully",
    cvUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});