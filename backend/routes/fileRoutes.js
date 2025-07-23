const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadFile } = require('../controllers/fileController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;
