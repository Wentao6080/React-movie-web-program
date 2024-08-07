module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);
  
  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // verify unique username and email
  router.post("/unify", controller.verifyUnique);

  // delete user
  router.delete("/user", controller.delete);

  // update details
  router.put("/user", controller.update);

  // Add routes to server.
  app.use("/api/users", router);
};


