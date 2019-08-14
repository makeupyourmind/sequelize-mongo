const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Groups = require('../models').Groups;

router.post('/', async(req, res) => {
    const savedGroup = await Groups.create(req.body);
  
    req.body.users.split(',').forEach(async (item) => {
        const user = await User.findByPk(item);
  
        if (!user) {
          return res.status(400).send("Doesn't exist");
        }
  
        const us = {
          UserId : item,
          GroupId : savedGroup.id
        } 
        const savedUsersGroup = await GroupUsers.create(us);
    })
  
    return res.status(200).json(savedGroup)
  })
  
router.get('/', async (req, res) => {
  
    const allGroups= await Groups.findAll({

    include: [{
            model: User,
            as: 'users',
            required: false,
            attributes: ['id', 'firstName', 'lastName', 'email'],
            through: {
            model: GroupUsers,
            as: 'groupUsers',
            }
        }]
    });
    return res.status(200).json({allGroups})
})
  

module.exports = router;