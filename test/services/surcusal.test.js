const app = require('../../src/app');

describe('\'surcusal \' service', () => {
  it('registered the service', () => {
    const service = app.service('surcusal');
    expect(service).toBeTruthy();
  });
});
