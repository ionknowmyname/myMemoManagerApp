// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

const Memo = require("../models/Memo");
const User = require("../models/User");
const { upload } = require("../uploadMulter");

///////////////////// GET ALL MEMOS /////////////////////
router.get("/memo", async (req, res) => {
    // console.log(req);
    try {
        const memo = await Memo.find();
        if (!memo) throw Error("No items");

        res.status(200).json(memo);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
/////////////////////////////////////////////////////

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
    const { id } = req.body;
    console.log("id: ", id);
    // console.log("req: ", req);
    const memo = await Memo.findById({ _id: id }); // req.params.id
    // console.log(memo);
    res.status(200).json(memo);
});

router.put("/memoUpdate", (req, res) => {
    const { userId, title, from, to, dateofArrival } = req.body;
    Memo.findOneAndUpdate(
        userId,
        { title, from, to, dateofArrival },
        (err, memo) => {
            if (err || !memo) {
                return res.status(400).json({
                    msg: "Memo does not exist",
                });
            } else {
                res.status(200).json({
                    msg: "Memo sucessfully updated",
                });
            }
        }
    );
});

/* router.post("/memoUpdate", auth, (req, res) => {
    const { userId, title, from, to, dateofArrival } = req.body;
    Memo.findOneAndUpdate(
        userId,
        { title, from, to, dateofArrival },
        (err, memo) => {
            if (err || !memo) {
                return res.status(400).json({
                    msg: "Memo does not exist",
                });
            } else {
                res.status(200).json({
                    msg: "Memo sucessfully updated",
                });
            }
        }
    );
}); */
////////////////////////////////////////////////////////////////////////

module.exports = router;
