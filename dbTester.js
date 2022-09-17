const mysql = require('mysql');
 
let con = mysql.createConnection({
  host: "mysql.memes.instinctmxd.com",
  user: "instinct",
  password: "instinct-memer",
  database: "instinctmxdcom_memes"
});

con.connect(function(err) {
  if(err) throw err;
  console.log('connected');
  let sql = "SELECT * FROM memes;"
  con.query(sql, function(err, result) {
    if(err) throw err;
    console.log(result);
  })
})