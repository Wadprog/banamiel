const app = require('../../src/app');

describe('\'tarea\' service', () => {
  it('registered the service', () => {
    const service = app.service('tarea');
    expect(service).toBeTruthy();
  });
});
