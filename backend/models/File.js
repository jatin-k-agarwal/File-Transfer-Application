const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverSocketId: String,
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
