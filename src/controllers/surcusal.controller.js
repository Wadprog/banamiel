const getAll = (app) => async (req, res, next) => {
  app
    .service("api/surcusal")
    .find({})
    .then(({ data: employees }) => {
      res.render("pages/surcusal/index", {
        user: { name: "test" },
        employees,
      });
    })
    .catch((err) => {
      console.log("\n\n\nError al obtener empleados\n\n\n\n");

      console.log(err);
    });
};

const addForm = (app) => (req, res, next) => {
  res.render("pages/surcusal/new", {
    user: { name: "test" },
  });
};

const createOne = (app) => (req, res, next) => {
  app
    .service("api/surcusal")
    .create(req.body)
    .then((employee) => {
      console.log(employee);
      console.log("employee created");
      res.redirect("employees");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
const getOne = (app) => (req, res, next) => {
  app
    .service("api/surcusal")
    .get(req.params.id)
    .then((employee) => {
      console.log(employee);
      res.render("pages/employees/profile", {
        user: { name: "test" },
        employee,
      });
    });
};

module.exports = { createOne, addForm, getAll, getOne };
