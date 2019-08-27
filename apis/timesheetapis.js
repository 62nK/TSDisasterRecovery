// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
// Local
const timesheetModel = require('../models/timesheet');
const properties = require('../properties.js');
const validation = require('../apis/validation.js');

// Constants
const router = express.Router();
const timesheetSchema = timesheetModel.TimeSheet;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Routes

// Get list of machine codes
router.get('/list', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else{ 
            machinecodeSchema.find((error, machinecodeList)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ message: "machinecode updated successfully", machinecodeList: machinecodeList});
                }
            });
        }
    });
});

// Get list of machine codes
router.get('/:id', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.find((error, machinecodeList)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ message: "machinecode updated successfully", machinecodeList: machinecodeList});
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
            response.status(403).json({error: error});
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
                response.status(500).json({error: error});
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
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.findByIdAndUpdate(request.params.id, request.body, (error, machinecode)=>{
                if(error) {
                    response.status(500).json({error: error});

                }
                else{
                    response.status(200).json({ message: "machinecode updated successfully", machinecode: machinecode});
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
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            machinecodeSchema.findByIdAndDelete(request.params.id, (error, machinecode)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ message: "machinecode removed successfully", machinecode: machinecode});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

module.exports = router;