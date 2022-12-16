const getAll = (app) => async (req, res, next) => {
  app
    .service("api/employees")
    .find({})
    .then(({ data: employees }) => {
      console.log(employees);
      res.render("pages/employees/index", {
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
  res.render("pages/employees_add/index", {
    user: { name: "test" },
  });
};

const createOne = (app) => (req, res, next) => {
  const imagenProfile = `../dist/img/${req.file.filename}`;
  // res.send({ ...req.body, f: req.file });
  app
    .service("api/employees")
    .create({ ...req.body, imagenProfile })
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
const getOne = (app) => async (req, res, next) => {
  const { data: todos } = await app.service("api/tarea").find({
    query: {
      employeeId: req.params.id,
    },
  });
  console.log("toods from profile \n\n\n");
  console.log(todos);
  app
    .service("api/employees")
    .get(req.params.id)
    .then((employee) => {
      console.log(employee);
      res.render("pages/employees/profile", {
        user: { name: "test" },
        employee,
        todos,
      });
    });
};

module.exports = { createOne, addForm, getAll, getOne };
