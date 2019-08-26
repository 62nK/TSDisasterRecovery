// Models
// Third Party
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Local
const properties = require('./properties.js');
const userapis = require('./apis/userapis.js');
const userModel = require('./models/user.js');

// Constants
const userSchema = userModel.User;

// Database connection
mongoose.connect(properties.database.url, { useNewUrlParser: true }, error =>{
    if(error){
        console.log("Error! "+ error);
    }else{
        console.log("Connected to MongoDB");
    }
});

// Default users
bcrypt.hash(properties.defaultAdmin.password, properties.encryption.saltRounds, function(error, hash){
    if(error){
        console.log({error: error});
    }
    else{
        const defaultAdmin = new userSchema({
            username : properties.defaultAdmin.username,
            role : properties.defaultAdmin.role,
            password : hash
        });
        defaultAdmin.save().then(function(result){
            console.log("default admin created successfully");
        }).catch(error=>{
            console.log("error creating default admin");
        });
    }
});
bcrypt.hash(properties.defaultUser.password, properties.encryption.saltRounds, function(error, hash){
    if(error){
        console.log({error: error});
    }
    else{
        const defaultUser = new userSchema({
            username : properties.defaultUser.username,
            role : properties.defaultUser.role,
            password : hash
        });
        defaultUser.save().then(function(result){
            console.log("default user created successfully");
        }).catch(error=>{
            console.log("error creating default user");
        });
    }
});


// Constants
const app = express();

// Router mapping
app.use('/userapis', userapis);

// Launching Node
app.listen(properties.port, ()=>console.log("Node running on server "+properties.port+"..."));