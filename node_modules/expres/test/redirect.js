describe('redirect', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.redirect(url)', function(){
    it('should default to a 302 redirect', function(done){
      respond(function(req, res){
        res.redirect('http://google.com');
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 302);
        assert.equal(res.headers['location'], 'http://google.com');
        done();
      });
    });

    describe('with leading //', function(){
      it('should pass through scheme-relative urls', function(done){
        respond(function(req, res){
          res.redirect('//cuteoverload.com');
        });

        get('/', function (err, res) {
          assert.equal(res.headers['location'], '//cuteoverload.com');
          done();
        });
      });
    });


    describe('with leading /', function(){
      it('should construct scheme-relative urls', function(done){
        respond(function(req, res){
          res.redirect('/login');
        });

        get('/', function (err, res) {
          assert.equal(res.headers['location'], '//example.com/login');
          done();
        });
      });
    });

    describe('with leading ./', function(){
      it('should construct path-relative urls', function(done){
        respond(function(req, res){
          res.redirect('./edit');
        });

        get('/post/1', function (err, res) {
          assert.equal(res.headers['location'], '//example.com/post/1/./edit');
          done();
        });
      });
    });

    describe('with leading ../', function(){
      it('should construct path-relative urls', function(done){
        respond(function(req, res){
          res.redirect('../new');
        });

        get('/post/1', function (err, res) {
          assert.equal(res.headers['location'], '//example.com/post/1/../new');
          done();
        });
      });
    });

    describe('without leading /', function(){
      it('should construct mount-point relative urls', function(done){
        respond(function(req, res){
          res.redirect('login');
        });

        get('/', function (err, res) {
          assert.equal(res.headers['location'], '//example.com/login');
          done();
        });
      });
    });
  });

  describe('.redirect(status, url)', function(){
    it('should set the response status', function(done){
      respond(function(req, res){
        res.redirect(303, 'http://google.com');
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 303);
        assert.equal(res.headers['location'], 'http://google.com');
        done();
      });
    });
  });

  describe('.redirect(url, status)', function(){
    it('should set the response status', function(done){
      respond(function(req, res){
        res.redirect('http://google.com', 303);
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 303);
        assert.equal(res.headers['location'], 'http://google.com');
        done();
      });
    });
  });

  describe('when the request method is HEAD', function(){
    it('should ignore the body', function(done){
      respond(function(req, res){
        res.redirect('http://google.com');
      });

      request().head('/').end(function (err, res) {
        assert.equal(res.headers['location'], 'http://google.com');
        assert.equal(res.text, '');
        done();
      });
    });
  });

  describe('when accepting html', function(){
    it('should respond with html', function(done){
      respond(function(req, res){
        res.redirect('http://google.com');
      });

      request()
      .get('/')
      .set('Accept', 'text/html')
      .set('Host', 'example.com')
      .end(function (err, res) {
        assert.equal(res.headers['location'], 'http://google.com');
        assert.equal(res.text, '<p>Moved Temporarily. Redirecting to <a href="http://google.com">http://google.com</a></p>');
        done();
      });
    });

    it('should escape the url', function(done){
      respond(function(req, res){
        res.redirect('<lame>');
      });

      request()
      .get('/')
      .set('Accept', 'text/html')
      .set('Host', 'example.com')
      .end(function (err, res) {
        assert.equal(res.text, '<p>Moved Temporarily. Redirecting to <a href="//example.com/&lt;lame&gt;">//example.com/&lt;lame&gt;</a></p>');
        done();
      });
    });
  });

  describe('when accepting text', function(){
    it('should respond with text', function(done){
      respond(function(req, res){
        res.redirect('http://google.com');
      });

      request()
      .get('/')
      .set('Accept', 'text/plain, */*')
      .set('Host', 'example.com')
      .end(function (err, res) {
        assert.equal(res.headers['location'], 'http://google.com');
        assert.equal(res.headers['content-length'], '51');
        assert.equal(res.text, 'Moved Temporarily. Redirecting to http://google.com');
        done();
      });
    });
  });

  describe('when accepting neither text or html', function(){
    it('should respond with an empty body', function(done){
      respond(function(req, res){
        res.redirect('http://google.com');
      });

      request()
      .get('/')
      .set('Accept', 'application/octet-stream')
      .set('Host', 'example.com')
      .end(function (err, res) {
        assert.equal(res.status, 302);
        assert.equal(res.headers['location'], 'http://google.com');
        assert.equal(res.headers['content-type'], undefined);
        assert.equal(res.headers['content-length'], '0');
        assert.equal(res.text, undefined);
        done();
      });
    });
  });
});