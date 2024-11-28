describe('json', function () {

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.json(object)', function () {
    it('should not support jsonp callbacks', function (done){
      respond(function (req, res){
        res.json({ foo: 'bar' });
      });

      get('/?callback=foo', function (err, res) {
        assert.equal(res.text, '{\n  "foo": "bar"\n}');
        done();
      });
    });

    it('should not override previous Content-Types', function (done){
      respond(function (req, res){
        res.type('application/vnd.example+json');
        res.json({ hello: 'world' });
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/vnd.example+json');
        done();
      });
    });

    describe('when given primitives', function () {
      it('should respond with json', function (done){
        respond(function (req, res){
          res.json(null);
        });

        get('/', function (err, res){
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, 'null');
          done();
        });
      });
    });

    describe('when given an array', function () {
      it('should respond with json', function (done){
        respond(function (req, res){
          res.json(['foo', 'bar', 'baz']);
        });

        get('/', function (err, res) {
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, '[\n  "foo",\n  "bar",\n  "baz"\n]');
          done();
        });
      });
    });

    describe('when given an object', function () {
      it('should respond with json', function (done){
        respond(function (req, res){
          res.json({ name: 'tobi' });
        });

        get('/', function (err, res) {
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.equal(res.text, '{\n  "name": "tobi"\n}');
          done();
        });
      });
    });
  });

  describe('.json(status, object)', function () {
    it('should respond with json and set the .statusCode', function (done){
      respond(function (req, res){
        res.json(201, { id: 1 });
      });

      get('/', function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(res.text, '{\n  "id": 1\n}');
        done();
      });
    });
  });

  describe('.json(object, status)', function () {
    it('should respond with json and set the .statusCode for backwards compat', function (done){
      respond(function (req, res){
        res.json({ id: 1 }, 201);
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