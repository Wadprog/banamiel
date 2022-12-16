// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const surcusal = sequelizeClient.define(
    "surcusal",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      superficieOficina: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      superficieTerreno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      superficieAlmacenes: {
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
  surcusal.associate = function (models) {
    surcusal.belongsTo(models.entidad);
    surcusal.hasMany(models.departamento);
    surcusal.hasMany(models.terreno);
  };

  return surcusal;
};
