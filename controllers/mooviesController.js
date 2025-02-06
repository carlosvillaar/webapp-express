const connection = require("../data/db");

const index = (req, res) => {
  const sql = `
  SELECT * 
  FROM movies`;
  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ error: "query al db fallita" });
    res.json(results);
  });
};

const show = (req, res) => {
  const id = req.params.id;

  const sql = `
  SELECT * 
  FROM movies M
  WHERE M.id = ?`;

  const sqlReviews = `
  SELECT *
  FROM reviews R
  WHERE R.movie_id = ?
  `;

  const imagePath = "http://localhost:3000/img/movies_cover/";

  connection.query(sql, [id], (err, results) => {
    if (err) res.status(500).json({ error: "query al db fallita" });

    if (results.length === 0)
      res.status(404).json({ error: "film non trovato" });

    const moovie = results[0];

    connection.query(sqlReviews, [id], (err, results) => {
      if (err) res.status(500).json({ error: "query al db fallita" });

      if (results.length === 0 || results.id === null)
        res.status(404).json({ error: "film non trovato" });

      const reviews = results;

      res.json({
        ...moovie,
        image: imagePath + moovie.title + ".jpg",
        reviews,
      });
    });
  });
};

module.exports = {
  index,
  show,
};
