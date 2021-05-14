const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
    {
        memoTo: { type: String },
        memoFrom: { type: String },
        memoTitle: { type: String },
        loggedDate: { type: String },
        date: { type: String },
        memoRemark: { type: String },
        select: { type: String },
        path: { type: String },
    },
    { timestamps: true }
);

const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo;
