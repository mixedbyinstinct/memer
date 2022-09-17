const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meme: {
    data: Buffer,
  }
})

const Meme = new mongoose.model("Meme", memeSchema);

module.exports = Meme;