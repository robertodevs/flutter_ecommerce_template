describe('jsonp', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.jsonp(object)', function(){
    it('should respond with jsonp', function(done){
      respond(function(req, res){
        res.jsonp({ count: 1 });
      });

      get('/?callback=something', function (err, res) {
        assert.equal(res.headers['content-type'], 'text/javascript; charset=utf-8');
        assert.equal(res.text, 'something({\n  "count": 1\n});');
        done();
      });
    });

    it('should allow []', function(done){
      respond(function(req, res){
        res.jsonp({ count: 1 });
      });

      get('/?callback=callbacks[123]', function (err, res) {
        assert.equal(res.headers['content-type'], 'text/javascript; charset=utf-8');
        assert.equal(res.text, 'callbacks[123]({\n  "count": 1\n});');
        done();
      });
    });

    it('should disallow arbitrary js', function(done){
      respond(function(req, res){
        res.jsonp({});
      });

      get('/?callback=foo;bar()', function (err, res) {
        assert.equal(res.headers['content-type'], 'text/javascript; charset=utf-8');
        assert.equal(res.text, 'foobar({});');
        done();
      });
    });

    describe('when given primitives', function(){
      it('should respond with json', function(done){
        respond(function(req, res){
          res.jsonp(null);
        });

        get('/', function (err, res) {
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, 'null');
          done();
        });
      });
    });

    describe('when given an array', function(){
      it('should respond with json', function(done){
        respond(function(req, res){
          res.jsonp(['foo', 'bar', 'baz']);
        });

        get('/', function (err, res) {
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, '[\n  "foo",\n  "bar",\n  "baz"\n]');
          done();
        });
      });
    });

    describe('when given an object', function(){
      it('should respond with json', function(done){
        respond(function(req, res){
          res.jsonp({ name: 'tobi' });
        });

        get('/', function (err, res) {
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, '{\n  "name": "tobi"\n}');
          done();
        });
      });
    });
  });

  describe('.json(status, object)', function(){
    it('should respond with json and set the .statusCode', function(done){
      respond(function(req, res){
        res.jsonp(201, { id: 1 });
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(res.text, '{\n  "id": 1\n}');
        done();
      });
    });
  });

  describe('.json(object, status)', function(){
    it('should respond with json and set the .statusCode for backwards compat', function(done){
      respond(function(req, res){
        res.jsonp({ id: 1 }, 201);
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(res.text, '{\n  "id": 1\n}');
        done();
      });
    });
  });
});
