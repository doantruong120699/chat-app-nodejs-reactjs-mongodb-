'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init({
    UserId: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};

// npx sequelize-cli model:generate --name Photo --attributes caption:text,url:text,height:integer,width:integer,owner_id:integer,likes:integer,comments:integer,share:integer