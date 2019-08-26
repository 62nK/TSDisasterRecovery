module.exports = function(user){
    // Models
    // Third Party
    const bcrypt = require('bcrypt');
    // Local
    const properties = require('./properties.js');
    const userModel = require('./models/user.js');

    // Constants
    const userSchema = userModel.User;

    // Default users
    bcrypt.hash(user.password, properties.encryption.saltRounds, function(error, hash){
        if(error){
            console.log({error: error});
        }
        else{
            const defaultUser = new userSchema({
                username : user.username,
                role : user.role,
                password : hash
            });
            defaultUser.save().then(function(result){
                console.log("default user "+user.username+" created successfully");
            }).catch(error=>{
                console.log(error);
            });
        }
    });
}