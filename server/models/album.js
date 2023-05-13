'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.User);
    }
  }
  Album.init({
    owner_id: DataTypes.INTEGER,
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};