// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
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

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes

// Get list of machine codes
router.get('/list', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.find((error, machinecodeList)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(machinecodeList);
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Get list of machine codes
router.get('/:id', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.find((error, machinecode)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(machinecode);
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Add machine code
router.post('/create', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else if(authData.role==properties.ADMIN){ 
            const newMachinecode = new machinecodeSchema({
                code: request.body.code,
                description: request.body.description,
                hourlyRent: request.body.hourlyRent,
                maxDailyHours: request.body.maxDailyHours
            });
            newMachinecode.save().then(function(result){
                response.status(200).json({success: "new machine code created successfully!"});
            }).catch(error=>{
                response.status(500).json(error);
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Edit machine code
router.post('/update/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.findByIdAndUpdate(request.params.id, request.body, (error, machinecode)=>{
                if(error) {
                    response.status(500).json(error);

                }
                else{
                    response.status(200).json(machinecode);
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Remove machine code
router.post('/remove/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.findByIdAndDelete(request.params.id, (error, machinecode)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(machinecode);
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

module.exports = router;