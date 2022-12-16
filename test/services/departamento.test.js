const app = require('../../src/app');

describe('\'departamento\' service', () => {
  it('registered the service', () => {
    const service = app.service('departamento');
    expect(service).toBeTruthy();
  });
});
