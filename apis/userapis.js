// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// Local
const userModel = require('../models/user.js');
const properties = require('../properties.js');

// Constants
const router = express.Router();
const userSchema = userModel.User;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Routes
// router.post('/signup', function(request, response){
//     bcrypt.hash(request.body.password, saltRounds, function(error, hash){
//         if(error){
//             return response.status(500).json({error: error})
//         }
//         else{
//             const newUser = new userSchema({
//                 username : request.body.username,
//                 role : request.body.role,
//                 password : hash
//             });
//             newUser.save().then(function(result){
//                 response.status(200).json({success: "new user created successfully!"});
//             }).catch(error=>{
//                 response.status(500).json({error: error});
//             });
//         }
//     });
// });

router.post('/signin', function(request, response){
    userSchema.findOne({username:request.body.username})
    .then(function(user){
        bcrypt.compare(request.body.password, user.password, function(error, result){
            if(error){
                return response.status(401).json({failure: "Unauthorized Access"});
            }
            if(result){
                const token = jsonwebtoken.sign({username: user.username, role: user.role, _id:user.id}, properties.encryption.privateKey);
                return response.status(200).json({success: "User Authenticated", token: token, message: "welcome "+user.username});            
            }
            response.status(500).json({error: error});
        });
    });
});

module.exports = router;