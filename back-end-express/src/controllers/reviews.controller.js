const db = require("../database");

// get all the reviews
exports.all = async (req, res) => {
    const reviews = await db.reviews.findAll({include: db.user});
  
    res.json(reviews);
  };

// Create a review in the database.
exports.create = async (req, res) => {
    const review = await db.reviews.create({
      text: req.body.text,
      rate: req.body.rate,
      email: req.body.email
    });
  
    res.json(review);
  };
  