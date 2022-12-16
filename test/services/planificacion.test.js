const app = require('../../src/app');

describe('\'planificacion\' service', () => {
  it('registered the service', () => {
    const service = app.service('planificacion');
    expect(service).toBeTruthy();
  });
});
