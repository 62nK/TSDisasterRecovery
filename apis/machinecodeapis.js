// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// Local
const machinecodeModel = require('../models/machinecode');
const properties = require('../properties.js');
const validation = require('../apis/validation.js');

// Constants
const router = express.Router();
const machinecodeSchema = machinecodeModel.MachineCode;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Routes
router.get('/validate', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            response.status(200).json({message: "user is ADMIN", authData: authData});
        }
        else if(authData.role==properties.ADMIN){
            response.status(200).json({message: "user is REGULAR", authData: authData});
        }
        else{
            response.status(401).json({failure: "Unauthorized Access"});
        }
    });
});

module.exports = router;