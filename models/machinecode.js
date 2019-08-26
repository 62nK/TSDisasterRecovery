"use strict";
exports.__esModule = true;
// Models
// Third Party
var mongoose_1 = require("mongoose");
exports.MachineCodeSchema = new mongoose_1.Schema({
    code: String,
    description: String,
    hourlyRent: Number,
    maxDailyHours: Number
});
exports.MachineCode = mongoose_1.model("MachineCode", exports.MachineCodeSchema);
