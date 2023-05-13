'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      album_id: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Albums',
            key: 'id',
          },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      caption: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      height: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      likes: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.INTEGER
      },
      share: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Photos');
  }
};