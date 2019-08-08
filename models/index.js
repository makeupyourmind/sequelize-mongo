// const Sequelize = require('sequelize');
// const TesterModel = require('./tester');
// const CompanyModel = require('./company');
// const UserModel = require('./user');

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres'
// });

// const Tester = TesterModel(sequelize, Sequelize);
// const Company = CompanyModel(sequelize, Sequelize);
// const User = UserModel(sequelize,Sequelize);

// module.exports = {sequelize, Tester, Company, User};
"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
