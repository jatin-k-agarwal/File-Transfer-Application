const File = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. User not authenticated.' });
    }

    const file = await File.create({
      filename: req.file.filename,
      path: req.file.path,
      sender: req.user._id,
      receiverSocketId: req.body.receiverSocketId
    });

    res.json({ message: 'File uploaded successfully', file });
  } catch (err) {
    console.error(" File upload error:", err.message);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};
