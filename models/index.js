const Sequelize = require('sequelize');
const TesterModel = require('./tester');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const Tester = TesterModel(sequelize, Sequelize);

module.exports = {sequelize, Tester};
