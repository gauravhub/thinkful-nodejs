var assert = require('assert');

describe('basic', function(){

  it('should pass a test', function(){
    assert.equal(1 + 1, 2);
  });

  it('should fail a test', function(){
    assert.equal(1 + 10, 7)
  });

  it('should skip a test');
});