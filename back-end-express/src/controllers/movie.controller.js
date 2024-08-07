const db = require("../database");

// get all the movies
exports.all = async (req, res) => {
    const movie = await db.movie.findAll();
  
    res.json(movie);
  };