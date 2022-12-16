const app = require('../../src/app');

describe('\'productos \' service', () => {
  it('registered the service', () => {
    const service = app.service('productos');
    expect(service).toBeTruthy();
  });
});
