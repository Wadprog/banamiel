const express = require("express");

// Custom dependencies
const ctrl = require("../controllers/tarea.controller");

const fnc = (app) => {
  const router = express.Router();
  router.route("/").get(ctrl.getAll(app)).post(ctrl.createOne(app));
  router.route("/new").get(ctrl.addForm(app));
  router.route("/:id").get(ctrl.getOne(app));
  router.route("/:id/edit").get(ctrl.editOne(app));
  return router;
};

// Creating the router Object

module.exports = fnc;
