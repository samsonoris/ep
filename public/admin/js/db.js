var pg = require('pg');
var connect = "postgres://Samuel:hello@localhost/ep";
var client = new pg.Client(connect);

function getContents(id) {
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT txt FROM content WHERE id = ' + id, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].txt);

      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
      return 
    });
  });
}