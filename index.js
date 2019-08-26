// Models
// Third Party
const express = require('express');
const mongoose = require('mongoose');
// Local
const properties = require('./properties.js');
const userapis = require('./apis/userapis.js');

// Database connection
mongoose.connect(properties.database.url, error =>{
    if(error){
        console.log("Error! "+ error);
    }else{
        console.log("Connected to MongoDB");
    }
});

// Constants
const app = express();

// Router mapping
app.use('/userapis', userapis);

// Launching Node
app.listen(properties.port, ()=>console.log("Node running on server "+properties.port+"..."));