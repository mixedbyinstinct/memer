
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
// Setup
const app = express();
const port = process.env['REACT_APP_PORT'];
const config = require('./webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    // Due to iOS devices memory constraints
    // disabling file watching is recommended 
    ignored: /.*/
  }
});

const Meme = require('./models/memeModel');
const fs = require('fs');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'memes')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});


app.post('/save-meme', (req, res) => {
  console.log('/save-meme called');
  let meme_name = req.body.name;
  let meme_url = req.body.url;
  let meme_id = req.body.id;
  
  console.log(meme_name);
  console.log(meme_url);
  console.log(meme_id);
  
  let con = mysql.createConnection({
    host: "mysql.memes.instinctmxd.com",
    user: "instinct",
    password: "instinct-memer",
    database: "instinctmxdcom_memes"
  });
  con.connect(function(err) {
    if(err) {
      res.json({
        dbConnect: false,
        message: err
      });
      console.log(err);
    }
    let sql = `INSERT INTO memes (Id, Name, Url) VALUES ("${meme_id}", "${meme_name}", "${meme_url}")`;
    con.query(sql, function(err, result) {
      if(err) {
        res.json({
          dbSave: false,
          message: err
        });
        console.log(err);
      }
      res.json({
        dbSave: true,
        message: 'You saved one! Make another?'
      })
    })
  })
})

app.get('/findmemes', (req, res) => {
  console.log('/findmemes called');
  let memes;
  let con = mysql.createConnection({
    host: "mysql.memes.instinctmxd.com",
    user: "instinct",
    password: "instinct-memer",
    database: "instinctmxdcom_memes"
  });
  con.connect(function(err) {
    if(err) {
      return res.json({
        dbConnect: false,
        message: err
      });
    }
    console.log('find memes route connnected to mysql');
    let sql = "SELECT * FROM memes";
    con.query(sql, function(err, result) {
      if(err) {
        console.log(err);
      }
      memes = result;
      return res.send(memes);
    })
  })
})

app.get('/clearmemes', (req, res) => {
  let con = mysql.createConnection({
    host: "mysql.memes.instinctmxd.com",
    user: "instinct",
    password: "instinct-memer",
    database: "instinctmxdcom_memes"
  });
  con.connect(function(err) {
    if(err) {
      return res.json({
        dbConnect: false,
        message: err
      });
    }
    console.log('clearmemes route connected');
    let sql = "DELETE FROM memes";
    con.query(sql, function(err, result) {
      if(err) {
        return res.json({
          deleteSuccess: false,
          message: err
        });
      }
      return res.json({
        deleteSuccess: true,
        message: 'Your memes have been cleared from the database successfully'
      });
    })
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
