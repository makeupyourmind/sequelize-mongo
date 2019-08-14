const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Company = require('../models').Company;

router.post('/', async (req, res) => {
    try {
      let response = await Company.create(req.body);
      res.json({response});
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
router.get('/', async(req, res) => {
    try {
        let response = await Company.findAll({include: {model :  User, as: 'employes'} });
        res.json({response});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
  
router.get('/:id', async(req, res) => {
    try {
        let response = await Company.findOne({include: [{model :  User, as: 'employes'}], where : {id: req.params.id} });
        if(response){
            res.json({response});
        }
        else{
            res.status(404).json({ message: "Company not found while getting data" });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});
  
router.delete('/:id', async (req, res) => {
    try {
        let find = await Company.findByPk(req.params.id);
        if(find){
            find.destroy();
            res.status(200).json({message: 'Deleted successfully'})
        }
        else{
            res.status(404).json({message: "Company not found"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});
  
  
  
router.patch('/:id', async (req, res) => {
    try {
        let find = await Company.findByPk(req.params.id);
        if(find){
            find.update(req.body);
            res.status(200).json({message: 'Updated successfully'})
        }
        else{
            res.status(404).json({message: "Company not found"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
    // Company
    // .findByPk(req.params.id).then((company) => {
    //     return company.update(req.body)
    // })
    // .then((updated) => {
    //     res.send(updated);
    // })
    // .catch((error) => {
    //     res.status(400).send(error.message);
    // })
})

module.exports = router;