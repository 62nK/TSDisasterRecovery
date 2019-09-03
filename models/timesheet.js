"use strict";
exports.__esModule = true;
// Models
// Third Party
var mongoose_1 = require("mongoose");
exports.TCEntrySchema = new mongoose_1.Schema({
    code: String,
    hrsWorked: Number,
    total: Number,
    type: String
});
exports.TCEntry = mongoose_1.model("Entry", exports.TCEntrySchema);
exports.TimeSheetSchema = new mongoose_1.Schema({
    siteCode: Number,
    contractorName: String,
    date: Date,
    entries: [exports.TCEntrySchema],
    approved: Boolean
});
exports.TimeSheet = mongoose_1.model("TimeSheet", exports.TimeSheetSchema);
