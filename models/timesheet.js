"use strict";
exports.__esModule = true;
// Models
// Third Party
var mongoose_1 = require("mongoose");
exports.TimeSheetSchema = new mongoose_1.Schema({
    siteCode: Number,
    contractorName: String,
    date: Date,
    entryCodes: [String]
});
exports.TimeSheet = mongoose_1.model("TimeSheet", exports.TimeSheetSchema);
