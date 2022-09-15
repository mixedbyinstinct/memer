const Meme = require('./models/memeModel');
const mongoose = require('mongoose');
const uri = 'mongodb://208.97.186.101:27018/personal-site-db';

let memes;
let array;
mongoose.connect(uri);
memes = Meme.find({name: 'Instinct'}).lean().exec(function(err, docs) {
  array = docs;
})

//memes = JSON.stringify(memes);


console.log(array);


//let memeArray = memes.toObject();
