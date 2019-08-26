// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// Local
const userSchema = require('../models/user.js');
const properties = require('../properties.js');

// Constants
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Routes
router.post('/signup', function(request, response){
    var saltRounds = 6;
    bcrypt.hash(request.body.password, saltRounds, function(error, hash){
        if(error){
            return response.status(500).json({error: error})
        }
        else{
            const newUser = new userSchema({
                username : request.body.username,
                password : hash
            });
            newUser.save().then(function(result){
                response.status(200).json({success: "new user created successfully!"});
            }).catch(error=>{
                response.status(500).json({error: error});
            });
        }
    });
});

router.post('/signin', function(request, response){
    userSchema.findOne({email:request.body.email})
    .then(function(user){
        bcrypt.compare(request.body.password, user.password, function(error, result){
            if(error){
                return response.status(401).json({failure: "Anauthorized Access"});
            }
            if(result){
                const token = jsonwebtoken.sign({ username: user.username, _id:user.id}, properties.encryption.privateKey);
                return response.status(200).json({success: "User Authenticated", token: token});
            }
            response.status(500).json({error: error});
        });
    });
});

module.exports = router;