const getAll = (app) => async (req, res, next) => {
  app
    .service("api/planificacion")
    .find({})
    .then(({ data: planificacions }) => {
      console.log(planificacions);
      res.render("pages/project/index", {
        user: { name: "test" },
        planificacions,
      });
    })
    .catch((err) => {
      console.log("Error al obtener proyectos/planeaciones \n\n\n\n");
      throw err;
    });
};

const addForm = (app) => (req, res, next) => {
  res.render("pages/project/project-add", {
    user: { name: "test" },
  });
};

const createOne = (app) => (req, res, next) => {
  console.log("data recipientEmail \n\n\n");
  console.log(req.body);
  app
    .service("api/planificacion")
    .create(req.body)
    .then((p) => {
      console.log(p);
      res.redirect("/projects");
    })
    .catch((err) => {
      console.log("Error al crear proyecto/planeacion \n\n\n\n");
      //console.log(err);
      res.status(500).send(err);
    });
};
const getOne = (app) => async (req, res, next) => {
  try {
    const { data: tareas } = await app.service("api/tarea").find({
      query: {
        planificacionId: req.params.id,
      },
    });
    console.log("tareas \n\n\n");
    console.log({ e: tareas[0]?.TareaVsEmployees });
    const planificacion = await app
      .service("api/planificacion")
      .get(req.params.id);
    res.render("pages/project/project-details", {
      user: { name: "test" },
      planificacion,
      tareas,
    });
  } catch (error) {
    console.log("Error al obtener proyecto/planeacion \n\n\n\n");
    console.log(error);
    res.status(500).send(error);
  }
};
const editOne = (app) => (req, res, next) => {
  app
    .service("api/employees")
    .get(req.params.id)
    .then((employee) => {
      console.log(employee);
      res.render("pages/project/project-edit", {
        user: { name: "test" },
        employee,
      });
    });
};

module.exports = { createOne, addForm, getAll, getOne, editOne };
