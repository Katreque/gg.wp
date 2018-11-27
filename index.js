const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const dbClient = new MongoClient(`mongodb://localhost:27017`, {useNewUrlParser: true});
let db = null;

dbClient.connect((err) => {
  if (err) {
    throw err;
  }

  db = dbClient.db("ggwp");
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/criar-usuario', (req, res) => {
    db.collection('usuarios').insertOne({nome: req.body.apelido})
        .then(() => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
})

app.get('/listar-usuarios', (req, res) => {
    db.collection('usuarios').find().toArray((err, r) => {
        if (!!err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.json(r);
    })
})

app.listen(port, () => console.log(`On ${port}!`));
