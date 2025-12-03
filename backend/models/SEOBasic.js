import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SEO = sequelize.define('SEO', {
  page: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(60)
  },
  description: {
    type: DataTypes.STRING(155)
  },
  keywords: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

export default SEO;