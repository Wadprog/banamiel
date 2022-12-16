const users = require('./users/users.service.js')
const productos = require('./productos/productos.service.js');
const entidad = require('./entidad/entidad.service.js');
const employees = require('./employees/employees.service.js');
const dirreccion = require('./dirreccion/dirreccion.service.js');
const calle = require('./calle/calle.service.js');
const surcusal = require('./surcusal/surcusal.service.js');
const departamento = require('./departamento/departamento.service.js');
const terreno = require('./terreno/terreno.service.js');
const tarea = require('./tarea/tarea.service.js');
const planificacion = require('./planificacion/planificacion.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(productos);
  app.configure(entidad);
  app.configure(employees);
  app.configure(dirreccion);
  app.configure(calle);
  app.configure(surcusal);
  app.configure(departamento);
  app.configure(terreno);
  app.configure(tarea);
  app.configure(planificacion);
}
