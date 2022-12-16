const { Sequelize } = require("sequelize");
module.exports = (app) => {
  const dbConfig = app.get("dbSettings");

  const options = { logging: false };
  const sequelize = dbConfig?.connectionString
    ? new Sequelize(dbConfig.connectionString, options)
    : new Sequelize({ ...dbConfig, ...options });

  const oldSetup = app.setup;

  app.set("sequelizeClient", sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ("associate" in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set("sequelizeSync", sequelize.sync({ force: true }));

    return result;
  };
};
