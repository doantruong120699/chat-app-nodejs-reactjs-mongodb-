'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    caption: DataTypes.TEXT,
    owner_id: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    comments: DataTypes.INTEGER,
    share: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
// npx sequelize-cli model:generate --name UserPost --attributes caption:text,owner_id:integer,likes:integer,comments:integer,share:integer