const app = require('../../src/app');

describe('\'dirreccion\' service', () => {
  it('registered the service', () => {
    const service = app.service('dirreccion');
    expect(service).toBeTruthy();
  });
});
