const express = require("express");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/dist/img");
  },
  filename: function (req, file, cb) {
    console.log("File Object", file);
    let ext = "";
    if (file.originalname.split(".").length > 1) {
      ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    }
    console.log("ext", ext);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage });
// Custom dependencies
const ctrl = require("../controllers/employees.controller");

const fnc = (app) => {
  const router = express.Router();
  router
    .route("/")
    .get(ctrl.getAll(app))
    .post(upload.single("avatar"), ctrl.createOne(app));
  router.route("/new").get(ctrl.addForm(app));
  router.route("/:id").get(ctrl.getOne(app));
  return router;
};

// Creating the router Object

module.exports = fnc;
