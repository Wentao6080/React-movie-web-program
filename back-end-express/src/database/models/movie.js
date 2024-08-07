// movie talbe contain movie name, image url and coming date
module.exports = (sequelize, DataTypes) =>
  sequelize.define("movie", {
    movieName: {
      type: DataTypes.STRING(96),
      primaryKey: true
    },
    movieURL: {
      type: DataTypes.STRING(196),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
