const mysql = require('mysql');

function saveToDb(name, id, url) {
  let con = mysql.createConnection({
    host: "mysql.memes.instinctmxd.com",
    user: "instinct",
    password: "instinct-memer",
    database: "instinctmxdcom_memes"
  });
  con.connect(function(err) {
    if(err) {
      console.log(err);
      return false;
    }
    console.log('MySQL Connected!');
    let sql = "INSERT INTO memes (Id, Name, Url) VALUES (id, name, url)";
    con.query(sql, function(err, result) {
      if(err) {
        console.log(err);
        return false;
      }
      if(result) {
      console.log('1 row inserted');
      return true;
      }
    })
  })
}

module.exports = saveToDb;