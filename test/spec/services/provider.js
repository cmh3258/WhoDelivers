'use strict';

describe('Service: provider', function () {

  // load the service's module
  beforeEach(module('whodeliversApp'));

  // instantiate service
  var provider;
  beforeEach(inject(function (_provider_) {
    provider = _provider_;
  }));

  it('should do something', function () {
    expect(!!provider).toBe(true);
  });

});
