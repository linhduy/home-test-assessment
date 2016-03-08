module.exports = {
  info: function(req, res){
    userId = req.param('id');
    UserService.info(userId, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  register: function(req, res){
    params = req.allParams();
    params.type = User.USER_TYPE.REGULAR
    params.active = false;
    UserService.create(params, function(err, newUser){
      if(err) return res.badRequest(err);

      AuthService.requestVerifyEmail(newUser, 'abcdf', function(err, result){
        if(err) console.log(err);

        return res.ok(newUser);
      });

    });
  },

  update: function(req, res){
    params = req.allParams();
    params.userId = req.session.userId;
    UserService.update(params, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  verifyEmail: function(req, res){
    email = req.param('email');
    secretkey = req.param('secretkey');
    AuthService.approveByEmail(email, secretkey, function(err, result){
      if(err) return res.badRequest(err);

      return res.ok("Bạn đã verify email thành công! Vui lòng đăng nhập");
    });
  }
}