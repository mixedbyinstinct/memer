
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const mongoose = require('mongoose');
// Setup
const app = express();
const port = 3001;
const config = require('./webpack.config.js');
const compiler = webpack(config);
const uri = 'mongodb://208.97.186.101:27018/personal-site-db';
const bodyParser = require('body-parser');
const Meme = require('./models/memeModel');
const fs = require('fs');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'memes')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' ' + file.originalname);
    }
});

var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'memes')));
app.use(express.static(path.join(__dirname, './dist')));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, './dist', 'index.html'));
})


app.get('/dbtest', (req, res) => {
  console.log('dbtest called');
  MongoClient.connect(uri, function(err, db) {
    if(err) {
      console.error(err);
    }
    console.log('connected');
    let dbo = db.db('personal-site-db');
    let memes = dbo.collection("memes").find().toArray();
    console.log(memes);
    res.json({
      memes: memes
    })
    db.close();
  })
})

app.post('/save-meme', upload.single('newMeme'), (req, res) => {
  console.log('/save-meme called');
  let incoming_meme = req.body.newMeme;
  let encode_meme = incoming_meme.toString('base64');
  
  let dbMeme = new Meme({
    name: req.body.name,
    meme: {
      data: new Buffer.from(encode_meme),
    },
  });
  mongoose.connect(uri).then(dbMeme.save());
  res.json({
    dbConnect: true,
    memeSaved: true,
    message: 'You saved one! make another?'
  })
})

app.get('/findmemes', (req, res) => {
  console.log('/findmemes called');
  let memes;
  mongoose.connect(uri).then(memes = Meme.find({}));
  console.log(memes);
  res.json({
    success: true,
    memes: memes
  })
})

// Launch app after connecting to database
  app.listen(port, () => {
    console.log(
      'Launching app... http://localhost:' + port + '\n'
    );
  });


// Register app and middleware. Required for better
// performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }
