const app = require('../../src/app');

describe('\'entidad \' service', () => {
  it('registered the service', () => {
    const service = app.service('entidad');
    expect(service).toBeTruthy();
  });
});
