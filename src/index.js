const express = require('express');
const app = express();
const path = require('path');

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
//const {Client} = require('virtuoso-sparql-client');
const {Client, Node, Text, Data, Triple} = require('virtuoso-sparql-client');


 
const DbPediaClient = new Client('http://192.168.0.22:8890/sparql');
DbPediaClient.query('DESCRIBE <http://dbpedia.org/resource/Sardinia>')
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });

//const {Client, Node, Text, Data, Triple} = require('virtuoso-sparql-client');
 
const SaveClient = new Client("http://www.myendpoint.org/sparql");
SaveClient.setOptions(
  "application/json",
  {"myprefix": "http://www.myschema.org/ontology/"},
  "http://www.myschema.org/resource/"
);
 
SaveClient.getLocalStore().add(
  new Triple(
    new Node("http://www.myschema.org/ontology/id123"),
    "dcterms:created",
    new Data(SaveClient.getLocalStore().now, "xsd:dateTimeStamp")
  )
);
SaveClient.getLocalStore().add(
  new Triple(
    "myprefix:id123",
    "rdfs:label",
    new Text("A new lable", "en"),
    Triple.ADD
  )
);
 
SaveClient.store(true)
.then((result)=>{
  console.log(result)
})
.catch((err) => {
  console.log(err);
});