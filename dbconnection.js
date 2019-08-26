module.exports = function connect(mongoose){
    // Models
    // Local
    const properties = require('./properties.js');

    // Database connection
    mongoose.connect(properties.database.url, { useNewUrlParser: true }, error =>{
        if(error){
            console.log("Error! "+ error);
        }else{
            console.log("Connected to MongoDB");
        }
    });
}