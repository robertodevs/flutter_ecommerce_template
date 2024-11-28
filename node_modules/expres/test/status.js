describe('status', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.status(code)', function(){
    it('should set the response .statusCode', function(done){
      respond(function(req, res){
        res.status(201).send('Created');
      });

      request()
      .get('/')
      .end(function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.text, 'Created');
        done();
      });
    });
  });
});