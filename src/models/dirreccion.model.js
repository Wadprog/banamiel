// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const dirreccion = sequelizeClient.define(
    "dirreccion",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroPropriedad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  dirreccion.associate = function (models) {
    dirreccion.belongsToMany(models.entidad, { through: "DirreccionVsEntidad" });
    dirreccion.belongsTo(models.calle);
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return dirreccion;
};
