module.exports = {
  login: function(req, res){
    email = req.param('email');
    password = req.param('password');

    AuthService.authenticate(email, password, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  }
}