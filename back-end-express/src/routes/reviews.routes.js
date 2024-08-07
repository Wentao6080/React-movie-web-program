module.exports = (express, app) => {
    const controller = require("../controllers/reviews.controller.js");
    const router = express.Router();
  
    // Select all movie.
    router.get("/", controller.all);
    // create a review.
    router.post("/", controller.create);
   
    // Add routes to server.
    app.use("/api/reviews", router);
  };
  