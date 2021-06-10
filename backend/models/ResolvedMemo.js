const mongoose = require("mongoose");

const resolvedMemoSchema = new mongoose.Schema(
    {
        memoTo: { type: String },
        memoFrom: { type: String },
        memoTitle: { type: String },
        loggedDate: { type: String },
        resolvedDate: { type: String },
        resolvedRemark: { type: String },
        //select: { type: String },
        //path: { type: String },
    },
    { timestamps: true }
);

const ResolvedMemo = mongoose.model("ResolvedMemo", resolvedMemoSchema);
module.exports = ResolvedMemo;
