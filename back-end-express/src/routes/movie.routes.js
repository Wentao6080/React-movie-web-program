module.exports = (express, app) => {
    const controller = require("../controllers/movie.controller.js");
    const router = express.Router();
  
    // Select all movie.
    router.get("/", controller.all);
   
    // Add routes to server.
    app.use("/api/movie", router);
  };
  