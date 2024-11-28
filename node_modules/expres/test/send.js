describe('send', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.send(null)', function(){
    it('should set body to ""', function(done){
      respond(function(req, res){
        res.send(null);
      });

      request()
      .get('/')
      .end(function (err, res) {
        assert.equal(res.text, undefined);
        done();
      });
    });
  });

  describe('.send(undefined)', function(){
    it('should set body to ""', function(done){
      respond(function(req, res){
        res.send(undefined);
      });

      request()
      .get('/')
      .end(function (err, res) {
        assert.equal(res.text, undefined);
        done();
      });
    });
  });

  describe('.send(code)', function(){
    it('should set .statusCode', function(done){
      respond(function(req, res){
        assert.equal(res.send(201), res);
      });

      request()
      .get('/')
      .expect('Created')
      .expect(201, done);
    });
  });

  describe('.send(code, body)', function(){
    it('should set .statusCode and body', function(done){
      respond(function(req, res){
        res.send(201, 'Created :)');
      });

      request()
      .get('/')
      .expect('Created :)')
      .expect(201, done);
    });
  });

  describe('.send(body, code)', function(){
    it('should be supported for backwards compat', function(done){
      respond(function(req, res){
        res.send('Bad!', 400);
      });

      request()
      .get('/')
      .expect('Bad!')
      .expect(400, done);
    });
  });

  describe('.send(String)', function(){
    it('should send as html', function(done){
      respond(function(req, res){
        res.send('<p>hey</p>');
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
        assert.equal(res.text, '<p>hey</p>');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should not override Content-Type', function(done){
      respond(function(req, res){
        res.set('Content-Type', 'text/plain').send('hey');
      });

      request()
      .get('/')
      .expect('Content-Type', 'text/plain')
      .expect('hey')
      .expect(200, done);
    });
  });

  describe('.send(Buffer)', function(){
    it('should send as octet-stream', function(done){
      respond(function(req, res){
        res.send(new Buffer('hello'));
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], 'application/octet-stream');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should not override Content-Type', function(done){
      respond(function(req, res){
        res.set('Content-Type', 'text/plain').send(new Buffer('hey'));
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], 'text/plain');
        assert.equal(res.text, 'hey');
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('.send(Object)', function(){
    it('should send as application/json', function(done){
      respond(function(req, res){
        res.send({ name: 'tobi' });
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(res.text, '{\n  "name": "tobi"\n}');
        done();
      });
    });
  });

  describe('when the request method is HEAD', function(){
    it('should ignore the body', function(done){
      respond(function(req, res){
        res.send('yay');
      });

      request()
      .head('/')
      .expect('', done);
    });
  });

  describe('when .statusCode is 204', function(){
    it('should strip Content-* fields & body', function(done){
      respond(function(req, res){
        res.status(204).send('foo');
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], undefined);
        assert.equal(res.headers['content-length'], undefined);
        assert.equal(res.text, undefined);
        done();
      });
    });
  });

  describe('when .statusCode is 304', function(){
    it('should strip Content-* fields & body', function(done){
      respond(function(req, res){
        res.status(304).send('foo');
      });

      request()
      .get('/')
      .end(function(err, res){
        assert.equal(res.headers['content-type'], undefined);
        assert.equal(res.headers['content-length'], undefined);
        assert.equal(res.text, undefined);
        done();
      });
    });
  });

  it('should not support jsonp callbacks', function(done){
    respond(function(req, res){
      res.send({ foo: 'bar' });
    });

    request()
    .get('/?callback=foo')
    .expect('{\n  "foo": "bar"\n}', done);
  });
});