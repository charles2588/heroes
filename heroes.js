const ratelimit = require('./middlewares/rateLimiter');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const port = 5000;
const app = express();

var cors = require('cors');

app.use(bodyParser.json());
app.use(ratelimit);
app.use(cors());
<<<<<<< HEAD

console.log(process.env.DATABASE_URL)
=======
>>>>>>> 3552e2ce8248efc312ce6e20ef55c8402fbe7064

const powers = [
  { id: 1, name: 'flying' },
  { id: 2, name: 'teleporting' },
  { id: 3, name: 'super strength' },
  { id: 4, name: 'clairvoyance'},
  { id: 5, name: 'mind reading' }
];

const { Client } = require('pg');

const client = new Client({
<<<<<<< HEAD
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    password: process.env.DB_PASS,
=======
    user: 'yaodugmpxxawfx',
    host: 'ec2-35-173-114-25.compute-1.amazonaws.com',
    database: 'dc6kl7ddmp1onp',
    password: '***REMOVED***',
>>>>>>> 3552e2ce8248efc312ce6e20ef55c8402fbe7064
    port: 5432,
    ssl: true
});

client.connect();

const query = `SELECT * FROM img_src`;

const heroes = ""

console.log(heroes);


var corsOptions = {
  origin: 'https://charles2588.github.io',

  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/heroes',(req, res) => {
  console.log('Returning heroes list');
  client.query(query, (err, dbres) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Rows from table successfully read.');
    res.send(dbres.rows);
    client.end();
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
