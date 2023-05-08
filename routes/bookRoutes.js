const express = require("express");
const router = express.Router();
const Books = require("../model/books");
const multer = require("multer");

// image upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uplaods");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

// insert an book intodatabase route

router.post("/add", upload, async(req, res) => {
  const books = new Books({
    name: req.body.name,
    author: req.body.author,
    isbn: req.body.isbn,    
    image: req.file.filename,
  });
  await books.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
        req.session.message={
            type: 'success',
            message: 'book addes successfully',

        };
        res.redirect("/");
    }
  });
});

router.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});

router.get("/add", (req, res) => {
  res.render("add_user", { title: "Add users" });
});


module.exports = router;
