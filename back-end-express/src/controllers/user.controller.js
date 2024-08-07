const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);
  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    email: req.body.email,
    username: req.body.name,
    password_hash: hash,
    joindate: req.body.date
  });

  res.json(user);
};

// check database username and email if it is unique
exports.verifyUnique = async (req, res) => {
  const users = await db.user.findAll();
  const name = req.body.name;
  let email1 = null;
  if (req.body.hasOwnProperty("email")){
      email1 = req.body.email;}
  const unique_name = users.filter((user)=> {return user.username == name})
  if (unique_name.length != 0){
    res.send("Username has aleady been created, please choose another");
    return
  }
  const unique_email = users.filter((email)=> {return email.email == email1})
  if (unique_email.length != 0){
    res.send("Email has aleady been created, please choose another");
    return
  }
  res.send("succesful")
};

// delete user and reviews
exports.delete = async (req, res) => {
  await db.reviews.destroy({where: {email: req.query.email}});
  const user = await db.user.destroy({where: {email: req.query.email}});

  res.json(user);
};

// change details
exports.update = async (req, res) => {
  if (req.body.password) {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    await db.user.update({password_hash: hash}, {where: {username: req.body.origin}});
  }
  if (req.body.name) {
    await db.user.update({username: req.body.name}, {where: {username: req.body.origin}});
    const user = await db.user.findOne({where: {username: req.body.name}});
    res.json(user);
    return
  }
  else {
    const user = await db.user.findOne({where: {username: req.body.origin
    }});
    res.json(user);
    return
  }
};
