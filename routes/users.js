const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Company = require('../models').Company;

router.post('/:companyId', async (req, res) => {
  try {
    let response = await User.create({...req.body, CompanyId: req.params.companyId});
    res.json({response});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get('/', async(req, res) => {
    try {
        let response = await User.findAll({include: [ {model :  Company, as: 'company'} ] })
        res.json({response});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', async(req, res) => {
    try {
        let response = await User.findOne({include: [{model :  Company, as: 'company'}], where: { id: req.params.id } } )
        res.json({response});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async(req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        return user.destroy();
    })
    .then(user => {
        res.json({user});
    })
    .catch((error) => {
        res.status(400).send(error.message);
    });
});

router.patch('/:id', (req, res) => {
    User
    .findByPk(req.params.id).then(user => {
        return user.update({...req.body, CompanyId: req.params.companyId})
    })
    .then((updated) => {
        res.send(updated);
    })
    .catch((error) => {
        res.status(400).send(error.message);
    })
});


module.exports = router;
