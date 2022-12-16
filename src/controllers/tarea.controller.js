const getAll = (app) => async (req, res, next) => {
  app
    .service("api/tarea")
    .find({})
    .then(({ data: tareas }) => {
      res.render("pages/tareas/index", {
        user: { name: "test" },
        tareas,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err);
    });
};

const addForm = (app) => async (req, res, next) => {
  try {
    const { data: projects } = await app.service("api/planificacion").find({});
    const { data: employees } = await app.service("api/employees").find({});
    const { query } = req;
    const renderOptions = {
      user: { name: "test" },
      projects,
      employees,
      planificacionId: query.planificacionId || null,
    };
    if (query.planificacionId) {
      const projectAssociate = await app
        .service("api/planificacion")
        .get(query.planificacionId);
      renderOptions.projectAssociate = projectAssociate;
    }
    res.render("pages/tareas/tarea-add", renderOptions);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

const createOne = (app) => async (req, res, next) => {
  const tarea = await app.service("api/tarea").create(req.body);

  if (req.body.employeeId)
    await app.get("sequelizeClient").models.TareaVsEmployees.create({
      employeeId: req.body.employeeId,
      tareaId: tarea.id,
    });
  res.redirect("/todos");
};
const getOne = (app) => (req, res, next) => {
  console.log("\n\nRequested plan\n\n");
  app
    .service("api/tarea")
    .get(req.params.id)
    .then((planificacion) => {
      res.render("pages/tareas/project-details", {
        user: { name: "test" },
        planificacion,
      });
    });
};

const editFrom = (app) => (req, res, next) => {
  app
    .service("api/employees")
    .get(req.params.id)
    .then((employee) => {
      console.log(employee);
      res.render("pages/tareas/tarea-edit", {
        user: { name: "test" },
        employee,
      });
    });
};
const editOne = (app) => (req, res, next) => {
  app
    .service("api/tarea")
    .patch(req.params.id, { ...req.body, ...req.query })
    .then((tarea) => {
      console.log("tarea updated");
      console.log(tarea);
      res.redirect("/todos");
    });
};

module.exports = { createOne, addForm, getAll, getOne, editOne, editFrom };
