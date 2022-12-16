const IncludeAssociation = require("../../Hooks/include.hook");
module.exports = {
  before: {
    all: [
      IncludeAssociation({
        include: [
          {
            model: "tarea",
            as: "employees",
          },
        ],
      }),
    ],
    find: [],
    get: [],
    create: [],
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
