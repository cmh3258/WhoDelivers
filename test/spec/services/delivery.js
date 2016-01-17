'use strict';

describe('Service: delivery', function () {

  // load the service's module
  beforeEach(module('whodeliversApp'));

  // instantiate service
  var delivery;
  beforeEach(inject(function (_delivery_) {
    delivery = _delivery_;
  }));

  it('should do something', function () {
    expect(!!delivery).toBe(true);
  });

});
