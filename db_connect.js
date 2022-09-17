const mysql = require('mysql');

function testDb(val1, val2, val3) {
let con = mysql.createConnection({
  host: "mysql.memes.instinctmxd.com",
  user: "instinct",
  password: "instinct-memer",
  database: "instinctmxdcom_memes"
});

let id = val1;
let name = val2;
let url = val3;

con.connect(function(err) {
  if(err) throw err;
  console.log('Connected!');
  let sql = 
  `INSERT INTO memes (Id, Name, Url) VALUES ("${id}", "${name}", "${url}")`;
  con.query(sql, function(err, result) {
    if(err) throw err;
    console.log('1 row inserted');
  })
})
}

testDb(1, 'test', 'testing');