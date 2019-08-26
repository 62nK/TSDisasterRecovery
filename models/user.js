"use strict";
exports.__esModule = true;
// Models
// Third Party
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    role: Number // ADMIN=0/REGULAR_USER=1
});
exports.User = mongoose_1.model("User", exports.UserSchema);
