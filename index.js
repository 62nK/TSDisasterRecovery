// Models
// Third Party
const express = require('express');
const mongoose = require('mongoose');
// Local
const properties = require('./properties.js');
const userapis = require('./apis/userapis.js');
const machinecodeapis = require('./apis/machinecodeapis.js');
const dbconnection = require('./dbconnection');
const userinit = require('./userinit.js');

// Database connection
dbconnection(mongoose);

// Default users
userinit(properties.defaultAdmin);
userinit(properties.defaultUser);

// Constants
const app = express();

// Router mapping
app.use('/userapis', userapis);
app.use('/machinecodeapis', machinecodeapis);

// Launching Node
app.listen(properties.port, ()=>console.log("Node running on server "+properties.port+"..."));