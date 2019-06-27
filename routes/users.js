const express = require('express')
const router = express.Router()

const users = require('../models/User');
//Login Page
router.get('/login', (req, res) => {
    res.send('Login');
})

//Register Page
router.get('/register', (req, res) => {
    res.send('Register');
})

//Register handle
router.post('/register', (req, res) => {
    console.log(req.body)
    res.send('register post');
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    //Check password match
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.send('fields error', errors);
    }
    

});

module.exports = router;