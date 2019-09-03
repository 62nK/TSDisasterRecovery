// Models
// Third Party
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
// Local
const timesheetModel = require('../models/timesheet');
// const tcentryModel = require('../models/entry');
const properties = require('../properties.js');
const validation = require('../apis/validation.js');

// Constants
const router = express.Router();
const timesheetSchema = timesheetModel.TimeSheet;
// const entrySchema = tcentryModel.TCEntry;


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
            timesheetSchema.find((error, timesheetList)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({timesheetList: timesheetList});
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
            timesheetSchema.find((error, timesheet)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ timesheet: timesheet});
                }
            });
        }
    });
});

// Add machine code
router.post('/create', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else{
            const newTimesheet= new timesheetSchema({
                siteCode: request.body.siteCode,
                contractorName: request.body.contractorName,
                date: request.body.date,
                approved: request.body.approved
            });
            for(let key in request.body.entries){
                newTimesheet.entries.push(
                    {
                        type: request.body.entries[key].type,
                        code: request.body.entries[key].code,
                        hoursWorked: request.body.entries[key].hoursWorked,
                        total: request.body.entries[key].total
                    }
                );
            }
            newTimesheet.save().then(function(result){
                response.status(200).json({success: "new Timesheet created successfully!"});
            }).catch(error=>{
                response.status(500).json({error: error});
            });
        }
    });
});

// Edit machine code
router.post('/update/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else{
            timesheetSchema.findByIdAndUpdate(request.params.id, request.body, (error, timesheet)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ timesheet: timesheet});
                }
            });
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
            timesheetSchema.findByIdAndDelete(request.params.id, (error, timesheet)=>{
                if(error) {
                    response.status(500).json({error: error});
                }
                else{
                    response.status(200).json({ timesheet: timesheet});
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

module.exports = router;