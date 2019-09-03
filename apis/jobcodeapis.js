// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
// Local
const jobModel = require('../models/job.js');
const properties = require('../properties.js');
const validation = require('../apis/validation.js');

// Constants
const router = express.Router();
const jobcodeSchema = jobModel.Job;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Routes

// Get list of job codes
router.get('/list', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            jobcodeSchema.find((error, jobcodeList)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({jobcodeList: jobcodeList});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Get list of job codes
router.get('/:id', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            jobcodeSchema.find((error, jobcode)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({jobcode: jobcode});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Add job code
router.post('/create', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            const newJobcode = new jobcodeSchema({
                code: request.body.code,
                description: request.body.description,
                hourlyRate: equest.body.hourlyRate,
                maxDailyHours: request.body.maxDailyHours
            });
            newJobcode.save().then(function(result){
                response.status(200).json({success: "new job code created successfully!"});
            }).catch(error=>{
                response.status(500).json({error: error});
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Edit job code
router.post('/update/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            jobcodeSchema.findByIdAndUpdate(request.params.id, request.body, (error, jobcode)=>{
                if(error) {
                    response.status(500).json({error: error});

                }
                else{
                    response.status(200).json({ message: "jobcode updated successfully", jobcode: jobcode});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

// Remove job code
router.post('/remove/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            jobcodeSchema.findByIdAndDelete(request.params.id, (error, jobcode)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ message: "jobcode removed successfully", jobcode: jobcode});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

module.exports = router;