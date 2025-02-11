const express = require("express");

const router = express.Router();

const mooviesController = require("../controllers/mooviesController");

//index
router.get("/", mooviesController.index);

//show
router.get("/:id", mooviesController.show);

//post
router.post("/:id/reviews", mooviesController.storeReview);

module.exports = router;
