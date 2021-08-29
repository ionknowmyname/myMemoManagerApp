// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

const Memo = require("../models/Memo");
const User = require("../models/User");
const { upload } = require("../uploadMulter");

const elastic = require("elasticsearch");
const elasticClient = elastic.Client({
    host: "localhost:9200",
});

///////////////////// GET ALL MEMOS /////////////////////
router.get("/memo", async (req, res) => {
    // console.log(req);
    try {
        const memo = await Memo.find({ isResolved: false });
        if (!memo) throw Error("No items");

        res.status(200).json(memo);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
/////////////////////////////////////////////////////////

// const uploads = upload.single("file");

//////////////////////// POST NEW MEMO ///////////////////////
router.post("/memo", upload.single("file"), (req, res) => {
    // uploads(req, res, (err) => {

    console.log("req.body: ", req.body);
    // console.log(req.files.file);
    console.log("req.file: ", req.file);

    const {
        memoTo,
        memoFrom,
        memoTitle,
        memoRemark,
        date,
        loggedDate,
        select,
    } = req.body;

    const memo = new Memo({
        memoTo,
        memoFrom,
        memoTitle,
        memoRemark,
        loggedDate,
        // fileName: req.file.filename,
        path: req.file.path,
        date,
        select,
    });

    memo.save()
        .then((memo) => {
            console.log("submitted memo: ", memo);

            res.status(200).send({
                memo: memo,
                msg: "Memo successfully registered",
            });
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
    // });
});
////////////////////////////////////////////////////////////////////////

//////////////////////// GET MEMO BY ID & UPDATE ////////////////////////
router.post("/queryMemo", async (req, res) => {
    try {
        const { ID } = req.body;
        console.log("id: ", ID);
        // console.log("req: ", req);
        const memo = await Memo.findById({ _id: ID });
        console.log("selected memo to pass front: ", memo);
        res.status(200).json(memo);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

router.post("/memoUpdate", async (req, res) => {
    // can also use put method
    try {
        const { ID, memoRemark, select } = req.body; // memoTo, memoFrom, memoTitle,

        Memo.findOneAndUpdate(
            { _id: ID },
            { memoRemark, select }, // memoTo, memoFrom, memoTitle,
            // so that it doesnt update
            (err, memo) => {
                if (!memo) {
                    return res.status(400).json({
                        msg: "Memo does not exist",
                    });
                } else {
                    if (err) {
                        return res.status(401).json({
                            msg: err,
                        });
                    }

                    res.status(200).json({
                        msg: "Memo sucessfully updated",
                        updatedMemo: memo,
                    });
                }
            }
        );
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

////////////////////////////////////////////////////////////////////////

////////////////////////////// RESOLVE MEMO //////////////////////////////
router.put("/resolvedMemo", async (req, res) => {
    try {
        const { ID, isResolved } = req.body;

        Memo.findByIdAndUpdate({ _id: ID }, { isResolved }, (err, memo) => {
            if (!memo) {
                return res.status(400).json({
                    msg: "Memo does not exist",
                });
            } else {
                if (err) {
                    return res.status(401).json({
                        msg: err,
                    });
                }

                res.status(200).json({
                    msg: "Memo sucessfully updated",
                    resolvedMemo: memo,
                });
            }
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
////////////////////////////////////////////////////////////////////////

///////////////////// GET RESOLVED MEMOS /////////////////////
router.get("/resolvedMemo", async (req, res) => {
    // console.log(req);
    try {
        const memo = await Memo.find({ isResolved: true });
        if (!memo) throw Error("No items");

        res.status(200).json(memo);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
/////////////////////////////////////////////////////////

module.exports = router;
