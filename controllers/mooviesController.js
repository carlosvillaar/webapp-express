const connection = require("../data/db");

const index = (req, res) => {
  const sql = `
  SELECT * 
  FROM movies`;
  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ error: "query al db fallita" });
    const movies = results;
    const getPath = `${req.protocol}://${req.get("host")}/`;
    const moovieswithimage = movies.map((movie) => ({
      ...movie,
      image: movie.image ? getPath + movie.image : null,
    }));
    res.json(moovieswithimage);
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
      const getPath = `${req.protocol}://${req.get("host")}/`;
      res.json({
        ...moovie,
        image: moovie.image ? getPath + moovie.image : null,
        reviews,
      });
    });
  });
};

module.exports = {
  index,
  show,
};
