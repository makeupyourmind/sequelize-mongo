const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const upload = require('./shared/multer');
const User = require('./mongo/user_mongo');
const { check } = require('express-validator');
const validate = require('./middleware/checkError');
require('dotenv').config();

const {Tester, sequelize} = require("./models");

sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

mongoose.connect('mongodb://localhost:27017/2', {useNewUrlParser: true}, function(err){
  if(err){
    console.log('Erro connect to DB', err);
  }
  console.log("Connected to DB");
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log("req.body : ", req.body);
    console.log(req.file);
});

app.post('/createMongoUser', async (req,res) => {

  try {
    let response = await User.create(req.body);
    res.status(200).json({response});
  } catch (error) {
      res.status(400).send(error.message);  
  }
  
});

app.post('/',  [
    check('email').isEmail().withMessage('must be email')
  ], validate, async (req,res) => {

  try {
    let response = await Tester.create(req.body);
    res.status(200).json({response});
  } catch (error) {
      res.status(400).send(error.message);  
  }

});

app.get('/', async (req, res) => {
  
    try {
      let response = await Tester.findAll();
      res.status(200).json({response});
    } catch (error) {
      res.send(error.message); 
    }
})

app.listen(3000, () => console.log("App listening on port 3000"));