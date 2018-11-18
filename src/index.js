const express = require('express');
const app = express();
const path = require('path');
const {Client} = require('virtuoso-sparql-client');

//Setting
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');


//middlewares


//routes
app.use(require('./routes/index'));

// static files


//listening server
app.listen(app.get('port'), () => {
    console.log('server works!', app.get('port'));
});

//client virtuoso

 
const DbPediaClient = new Client('http://192.168.0.22:8890/sparql');
DbPediaClient.query('DESCRIBE <http://192.168.0.22:8890>')
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });

  
  //http://192.168.0.22:8890/sparql?query=SELECT%20DISTINCT%20%20?o%20%3Chttp://localhost:8890/DAV/home/dba/rdf_sink/%3E%20WHERE%20{?s%20foaf:name%20?o}