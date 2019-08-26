"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.JobSchema = new mongoose_1.Schema({
    jobCode: String,
    description: String,
    hourlyRate: Number,
    maxHoursPerDay: Number
});
exports.Job = mongoose_1.model("Job", exports.JobSchema);
