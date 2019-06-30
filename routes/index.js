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
      newUser.password = newUser.generateHash(password);
      
    newUser.save((err, user) => {
      res.send({
        success: true,
        message: 'Account created'
      })
    })
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

  // @route   GET api/verify
  // @desc    verify token
  // @access  Private
  router.get('/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token
    }, (err, sessions) => {
      if (err) {
        return res.send({
          succes: false,
          message: 'Server Error'
        })
      }

      if(sessions.length !=1){
        return res.send({
          succes: false,
          message: 'Error: Invalid'
        })
      } else {
        return res.send({
          succes: true,
          message: 'Green!'
        })
      }
    })

  });

  // @route   GET api/logout
  // @desc    Logout
  // @access  Private
  router.get('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set:{
      isDeleted:true
      }
    }, null, (err, sessions) => {
      
      if (err) {
        return res.send({
          succes: false,
          message: 'Server Error'
        })
      }

      
        return res.send({
          succes: true,
          message: 'Green!'
        })
      
    })
  });

  // @route   POST api/viewUsers
  // @desc    View Users
  // @access  Private
  router.get('/viewUsers', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");


    User.find({}, 'firstName lastName email isDeleted', (err, users) => {
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