const express = require("express");

const app = express();

const cors = require("cors");

const port = 3000;

const mooviesRouter = require("./router/moovies");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const errorsHandler = require("./middlewares/errorshandlerr");

const notFound = require("./middlewares/notFound");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server dei film");
});

app.use("/movies", mooviesRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
  console.log("sono in ascolto alla porta 3000");
});
