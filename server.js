const express = require('express');

const app = express();

const port = 3000;

const mooviesRouter = require('./router/moovies')

app.use(express.static('public'))

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server dei film')
});

app.use('/moovies', mooviesRouter)

app.listen(port, () => {
  console.log('sono in ascolto alla porta 3000')
});