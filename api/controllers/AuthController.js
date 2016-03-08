module.exports = {
  login: function(req, res){
    email = req.param('email');
    password = req.param('password');

    AuthService.authenticate(email, password, function(err, user){
      if(err) return res.badRequest(err);

      req.session.userId = user.id;
      req.session.authenticated = true;
      return res.ok(user);
    });
  },

  logout: function(req, res){
  	req.session.destroy(function(err) {
      return res.ok("logout success");
    });
  }
}