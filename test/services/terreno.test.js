const app = require('../../src/app');

describe('\'terreno\' service', () => {
  it('registered the service', () => {
    const service = app.service('terreno');
    expect(service).toBeTruthy();
  });
});
