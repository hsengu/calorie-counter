<<<<<<< HEAD
const Sequelize = require('sequelize');
require('dotenv').config();

=======
>>>>>>> feature/databases
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}
<<<<<<< HEAD

=======
>>>>>>> feature/databases
module.exports = sequelize;