const ratelimit = require('./middlewares/rateLimiter');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const port = 5000;
const app = express();

var cors = require('cors');
var compression = require('compression');//for compressing the response suggested by chromedevtools

app.use(bodyParser.json());
app.use(ratelimit);
app.use(cors());

// compress all responses
app.use(compression())

console.log(process.env.DATABASE_URL)
const powers = [
  { id: 1, name: 'flying' },
  { id: 2, name: 'teleporting' },
  { id: 3, name: 'super strength' },
  { id: 4, name: 'clairvoyance'},
  { id: 5, name: 'mind reading' }
];

const { Pool, Client } = require('pg')
connectionString = "postgresql://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + ":5432/" + process.env.DB_DBNAME + "?ssl=true"
console.log(connectionString);

const pool = new Pool({
  connectionString,
})



const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    password: process.env.DB_PASS,
    port: 5432,
    ssl: true
});


const query = `SELECT * FROM img_src`;

const heroes = ""

console.log(heroes);


var corsOptions = {
  origin: 'https://charles2588.github.io',

  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/heroes',(req, res) => {
  console.log('Returning heroes list');

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('connexion error', err);
    }
    client.query(query, function(err, result) {
      // call `done()` to release the client back to the pool
      done();
  
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
  });  
  
});

app.get('/powers', (req, res) => {
  console.log('Returning powers list');
  res.send(powers);
});

app.post('/hero/**', (req, res) => {
  const heroId = parseInt(req.params[0]);
  const foundHero = heroes.find(subject => subject.id === heroId);

  if (foundHero) {
      for (let attribute in foundHero) {
          if (req.body[attribute]) {
              foundHero[attribute] = req.body[attribute];
              console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`);
          }
      }
      res.status(202).header({Location: `http://localhost:${port}/hero/${foundHero.id}`}).send(foundHero);
  } else {
      console.log(`Hero not found.`);
      res.status(404).send();
  }
});

app.use('/img', express.static(path.join(__dirname,'img')));


console.log(`Heroes service listening on port ${port}`);
app.listen(process.env.PORT || port);
