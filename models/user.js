// Modules
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String    // ADMIN/REGULAR
});

// Export
module.exports = mongoose.model('User', userSchema);