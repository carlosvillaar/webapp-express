const connection = require('../data/db')

const index = (req, res) => {
  const sql = 'SELECT * FROM movies'
  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({error: 'query al db fallita'});
    res.json(results)
  })
}

const show = (req, res) => {
  const id = req.params.id;
  res.send(`dettaglio film con id ${id}`)
}


module.exports = {
  index,
  show
}