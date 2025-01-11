import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModels.js";
import Products from "./ProductModels.js";

const { DataTypes } = Sequelize;

const Cart = db.define(
  "Cart",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Users.hasMany(Cart);
Cart.belongsTo(Users, { foreignKey: "userId" });
Products.hasMany(Cart);
Cart.belongsTo(Products, { foreignKey: "productId" });

export default Cart;
