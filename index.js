const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const upload = require('./shared/multer');
//const User = require('./mongo/user_mongo');
const Profile = require('./mongo/profile');
const { check } = require('express-validator');
const validate = require('./middleware/checkError');
const fs = require('fs');
const {Service} = require('./Service');

require('dotenv').config();

// const {Tester, Company, User, sequelize} = require("./models");
let models = require("./models");
const User = models.User;
const Company = models.Company;

models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// mongoose.connect('mongodb://localhost:27017/2', {useNewUrlParser: true}, function(err){
//   if(err){
//     console.log('Erro connect to DB', err);
//   }
//   console.log("Connected to DB");
// });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.patch('/profilePhoto/:id', function (req, res) {

  upload(req, res, function (err) {
    console.log("err  : ", err);
    if (err) {
      return res.status(400).send(err.message)
    }
    Service.profilePhoto(req,res);
  })

});

app.get('/getProfile/:id', async (req, res) => {
  try {
    let response = await Profile.findOne({user: req.params.id});
    console.log("RESPONSE GET AVATAR : ", response.avatar)
     res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/createUser', async (req, res) => {
  try {
    let response = await User.create(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.patch('/updateProfile/:id', async (req, res) => {

    try {
       req.body.user = req.params.id;
       let response = await Profile.findOneAndUpdate({user: req.params.id}, req.body, {new: true});

       if(response === null){
          response = await Profile.create(req.body);
       }

       res.status(200).json({response});
    } catch (error) {
      res.status(400).send(error.message);
    }
})

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

app.post('/createUser', async (req, res) => {
  try {
    let response = await User.create(req.body);
    res.json({response});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/createCompany', async (req, res) => {
  try {
    let response = await Company.create(req.body);
    res.json({response});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.get('/getUser', async(req, res) => {
  try {
    let response = await User.findOne({
      where: {email: 'test'}, include: [{model: Company, as: 'company', where: { name: 'testCompany' }}]
    })
    res.json({response});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/getCompany', async(req, res) => {
try {
  let response = await Company.findAll({include: ['employes']});
  res.json({response});
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

const options = {
  key: fs.readFileSync("device.key"),
  cert: fs.readFileSync("nomidman.crt")
}


const server = https.createServer(options, app);

server.listen(3000, function () {
 console.log('Express server is up on port 3000');
});
//app.listen(3000, () => console.log("App listening on port 3000"));