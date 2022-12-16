const { authenticate } = require("@feathersjs/authentication").hooks;

const addAssociation = require("../../Hooks/assoc.hooks");
const IncludeAssociation = require("../../Hooks/include.hook");
module.exports = {
  before: {
    all: [
      IncludeAssociation({
        include: [
          {
            model: "employees",
            as: "entidad",
          },
        ],
      }),
    ],
    find: [],
    get: [],
    create: [
      async (context) => {
        console.log("\n\nn function called ");
        const { app, params, data } = context;
        try {
          const entity = await app.service("api/entidad").create({ ...data });
          context.data.entidadId = entity?.id;
          return context;
        } catch (error) {
          console.log("Error al crear entidad\n\n\n");
          console.log({ error: error });
        }
      },
      (ctx) => {
        console.log("data after entity");
        console.log(ctx.data);
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
