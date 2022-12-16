module.exports = function (options) {
  // eslint-disable-next-line no-param-reassign
  options.models = options.models || [];

  return async (context) => {
    const sequelize = context.params.sequelize || {};
    const include = sequelize.include || [];

    //	Reasign in case we created these properties
    sequelize.include = include.concat(
      options.models.map((model) => {
        const newModel = { ...model };

        newModel.model = context.app.services[`api/${model.model}`].Model;

        return newModel;
      })
    );

    //	Nested output
    sequelize.raw = false;

    context.params.sequelize = sequelize;
    return context;
  };
};
