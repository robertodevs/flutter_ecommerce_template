describe('set', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.set(field, value)', function(){
    it('should set the response header field', function(done){
      respond(function(req, res){
        res.set('Content-Type', 'text/x-foo').end();
      });

      request()
      .get('/')
      .expect('Content-Type', 'text/x-foo')
      .end(done);
    });

    it('should coerce to a string', function(){
      var res = response();
      res.set('ETag', 123);
      assert.equal(res.get('ETag'), '123');
    });
  });

  describe('.set(object)', function(){
    it('should set multiple fields', function(done){
      respond(function(req, res){
        res.set({
          'X-Foo': 'bar',
          'X-Bar': 'baz'
        }).end();
      });

      request()
      .get('/')
      .expect('X-Foo', 'bar')
      .expect('X-Bar', 'baz')
      .end(done);
    });

    it('should coerce to a string', function(){
      var res = response();
      res.set({ ETag: 123 });
      assert.equal(res.get('ETag'), '123');
    });
  });
});