const path = require("path");
const multer = require("multer");
// const uuid = require('uuid').v4

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb = callback
        cb(null, "./uploads/"); // uploads folder
    },
    filename: (req, file, cb) => {
        /* const ext = path.extname(file.originalname);
        const id = `${Date.now()}-${file.originalname}`; // uuid();
        cb(null, `${id}${ext}`); */

        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }, // bytes, so 3MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb); // makes sure only images are uploaded
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/; // allowed extensions
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    ); //check extensions
    const mimetype = filetypes.test(file.mimetype); //check mimetype incase they rename extensions

    if (mimetype && extname) {
        // if both true
        return cb(null, true); // null error
    } else {
        cb(res.status(400).end("only jpeg, jpg, png is allowed"), false);
    }
}

module.exports = { upload };
