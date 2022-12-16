const { merge } = require("lodash");
const associateModels = (include, context) => {
  const associations = [];

  (Array.isArray(include) ? include : [include]).forEach((assoc) => {
    const { as: associate, model, include: subInclude, ...rest } = assoc;
    console.log("ser\n\n");
    console.log({
      a: context.app.service(`api/${model}`).Model,
      b: `api/${model}`,
    });
    if (associate in context.app.service(`api/${model}`).Model.associations) {
      const association = {
        association: context.app.service(`api/${assoc.model}`).Model
          .associations[associate],
        ...rest,
      };
      if (subInclude)
        association.include = associateModels(subInclude, context);

      associations.push(association);
    } else {
      throw new Error(
        `Requested association '${assoc.as}' of model ${
          context.app.service(model).Model.name
        } doesn't exist. Available associations are: ${
          context.app.service(model).Model.associations
        }`
      );
    }
  });
  return associations;
};

module.exports = (options) => async (context) => {
  if (!options.include) throw new Error(`Include is not defined`);

  try {
    const include = associateModels(options.include, context);

    if (include) {
      context.params.sequelize = merge(context.params.sequelize, {
        include,
        raw: false,
      });
    }
    return context;
  } catch (err) {
    throw new Error(err);
  }
};
