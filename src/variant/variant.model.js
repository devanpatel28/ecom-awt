const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    price: { type: DataTypes.INTEGER, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false },
    barcode: { type: DataTypes.STRING, allowNull: false },
    unit: { type: DataTypes.INTEGER, allowNull: false },
  };
  return sequelize.define("varient", attributes);
}
