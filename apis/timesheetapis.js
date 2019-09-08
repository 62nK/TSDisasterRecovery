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
        else{ 
            timesheetSchema.find((error, timesheetList)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(timesheetList);
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
            timesheetSchema.findOne({ _id: request.params.id },(error, timesheet)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(timesheet);
                }
            });
        }
    });
});

// Add machine code
router.post('/create', validation, (request, response)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else{
            const newTimesheet= new timesheetSchema({
                code: request.body.code,
                contractorName: request.body.contractorName,
                date: request.body.date,
                approved: request.body.approved,
                hours: request.body.hours,
                total: request.body.total
            });
            for(let key in request.body.entries){
                newTimesheet.entries.push(
                    {
                        type: request.body.entries[key].type,
                        code: request.body.entries[key].code,
                        hours: request.body.entries[key].hours,
                        total: request.body.entries[key].total
                    }
                );
            }
            newTimesheet.save().then(function(result){
                response.status(200).json({success: "new Timesheet created successfully!"});
            }).catch(error=>{
                response.status(500).json(error);
            });
        }
    });
});

// Edit machine code
router.put('/update/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json(error);
        } 
        else{
            timesheetSchema.findByIdAndUpdate(request.params.id, request.body, (error, timesheet)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(timesheet);
                }
            });
        }
    });
});

// Remove timesheet
router.delete('/remove/:id', validation, (request, response, next)=>{
    jsonwebtoken.verify(request.token, properties.encryption.privateKey, (error, authData)=>{
        if(error) {
            response.status(403).json({error: error});
        } 
        else if(authData.role==properties.ADMIN){ 
            timesheetSchema.findByIdAndDelete(request.params.id, (error, timesheet)=>{
                if(error) {
                    response.status(500).json(error);
                }
                else{
                    response.status(200).json(timesheet);
                }
            });
        }
        else{
            response.status(401).json({failure: "User doesn't have necessary priviledges to complete this action"});
        }
    });
});

module.exports = router;