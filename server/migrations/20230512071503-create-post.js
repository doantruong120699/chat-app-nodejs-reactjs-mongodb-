'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      caption: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Posts');
  }
};