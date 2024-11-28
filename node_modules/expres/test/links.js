describe('links', function(){
  describe('.links(obj)', function(){
    it('should set Link header field', function(){
      var res = response();

      res.links({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
      });

      var link = res.get('link');
      assert.equal(link, '<http://api.example.com/users?page=2>; rel="next", ' +
                         '<http://api.example.com/users?page=5>; rel="last"');
    });
  });
});