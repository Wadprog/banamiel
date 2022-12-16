const app = require('../../src/app');

describe('\'calle\' service', () => {
  it('registered the service', () => {
    const service = app.service('calle');
    expect(service).toBeTruthy();
  });
});
