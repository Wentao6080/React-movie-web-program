
// user table contain username, eamil, password and joined date 
module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    joindate: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
