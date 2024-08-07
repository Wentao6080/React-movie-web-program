// review talbe contain review ID and review content
module.exports = (sequelize, DataTypes) =>
  sequelize.define("reviews", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
