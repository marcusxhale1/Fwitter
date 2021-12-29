const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LikeButton extends Model {}

LikeButton.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      LikeButton_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'LikeButton',
          key: 'id'
        }
      }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'LikeButton'
  }
);

module.exports = LikeButton;
