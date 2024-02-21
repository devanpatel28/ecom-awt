//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize, HasMany } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });

  await connection.query(`Create database if not exists \`${DB}\`;`);

  //connect to db
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: "mysql",
    host: HOST,
  });

  db.Category = require("../src/category/category.model")(
    sequelize
  );
  db.Product = require("../src/product/product.model")(
    sequelize
  );

  db.Category.HasMany(db.Product);
  db.Product.belongsTo(db.Category);
  
  await sequelize.sync({ alter: true });
}
