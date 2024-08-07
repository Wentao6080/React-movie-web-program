const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.reviews = require("./models/reviews.js")(db.sequelize, DataTypes);

// Relate reviews and user.
db.reviews.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });


// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // give movie date if does not exist
  await seedMovieDate();
};

async function seedMovieDate() {
  const count = await db.movie.count();

  // Only seed data if necessary.
  if(count > 0)
    return;
  await db.movie.create({
    movieName: "The war",
    movieURL:
      "https://images.unsplash.com/photo-1691066261207-1001c07b79ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1939&q=80",
    date: "09.10.2023",
  })
  await db.movie.create({
    movieName: "The forest",
    movieURL:
      "https://images.unsplash.com/photo-1691685783089-02f22ac1f9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1885&q=80",
    date: "07.11.2023",
  })
  await db.movie.create({
    movieName: "The bed",
    movieURL:
      "https://images.unsplash.com/photo-1692455067486-d4637182a61c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    date: "30.12.2023",
  })
  await db.movie.create({
    movieName: "Animals",
    movieURL:
      "https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    date: "01.01.2024",
  })
  await db.movie.create({
    movieName: "God and sea",
    movieURL:
      "https://images.unsplash.com/photo-1691715502369-3fae29561ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    date: "05.05.2024",
  })
  await db.movie.create({
    movieName: "The Lonelinese",
    movieURL:
      "https://images.unsplash.com/photo-1691765612455-4f09cdc93977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    date: "07.05.2024",
  })

 }

module.exports = db;

