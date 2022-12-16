const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const planificacion = sequelizeClient.define(
    "planificacion",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      budgeto_estimado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      budgeto_gastado: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      duracion_estimado: {
        type: DataTypes.INTEGER,
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

  planificacion.associate = function (models) {
    planificacion.hasMany(models.tarea);
  };

  return planificacion;
};
