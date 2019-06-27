const express = require('express')
const router = express.Router()

//User Model
const User = require('../models/User');
const UserSession = require('../models/UserSession');

  
  // @route   POST api/register
  // @desc    Register a user
  // @access  Private
  router.post('/register', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      email,
      password
    } = body;

    if (!firstName) {
      res.send({
        success: false,
        message: 'Error: First name cannot be blank'
      })
    }
    if (!lastName) {
      res.send({
        success: false,
        message: 'Error: Last name cannot be blank'
      })
    }
    if (!email) {
      res.send({
        success: false,
        message: 'Error: email cannot be blank'
      })
    }
    if (!password) {
      res.send({
        success: false,
        message: 'Error: password cannot be blank'
      })
    }

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        res.send('Error: Server error');
      } else if (previousUsers.length > 0) {
        res.send('Error: Account already exist');
      }
    })
     
   const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;
      
   newUser.save().then(user => res.json(user));
  });

  // @route   POST api/login
  // @desc    login a user
  // @access  Private
  router.post('/login', (req, res, next) => {
    const { body } = req;
    const {
      email,
      password
    } = body;
  
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      }
      if (users.length !=1) {
        return res.send({
          success:false,
          message: 'Invalid User'
        })
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success:false,
          message: 'Invalid Password'
        })
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error2'
          })
        }

        return res.send({
          success: true,
          message: 'Valid login',
          token: doc._id
        })
      })
    })
   
  });

  router.get('/usersGet', (req, res) => {
    User.find({}, 'firstName lastName email', (err, users) => {
      if(err) {
        return res.send({
          succes: false,
          message: 'server error'
        })
      }
  
      console.log('userArray', users[0].firstName)
      console.log('userArrayLength', users.length)
      return res.send({
        success: true,
        message: users
      })
   });
  });



module.exports = router;