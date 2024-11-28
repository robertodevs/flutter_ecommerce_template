describe('get', function () {
  it('should get the response header field', function(){
    var res = response();
    res.setHeader('Content-Type', 'text/x-foo');
    assert.equal(res.get('Content-Type'), 'text/x-foo');
    assert.equal(res.get('Content-type'), 'text/x-foo');
  });
});