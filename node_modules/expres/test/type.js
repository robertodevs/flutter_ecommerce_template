describe('type', function(){

  beforeEach(createServer);
  afterEach(closeServer);

  describe('.type(str)', function(){
    it('should set the Content-Type with type/subtype', function(done){
      respond(function(req, res){
        res.type('application/vnd.amazon.ebook')
          .send('var name = "tj";');
      });

      request()
      .get('/')
      .expect('Content-Type', 'application/vnd.amazon.ebook', done);
    });
  });
});