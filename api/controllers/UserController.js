var uuid = require('node-uuid');

module.exports = {
  info: function(req, res){
    userId = req.param('id');
    UserService.info(userId, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  register: function(req, res){
    var verifyToken = uuid.v4();
    params = req.allParams();
    params.type = User.USER_TYPE.REGULAR
    params.active = false;
    params.activeCode = verifyToken;
    UserService.create(params, function(err, newUser){
      if(err) return res.badRequest(err);

      AuthService.requestVerifyEmail(newUser, verifyToken, function(err, result){
        if(err) sails.log.error(err);
      });

      return res.ok(newUser);
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
    verifyToken = req.param('verifytoken');
    AuthService.approveByEmail(email, verifyToken, function(err, result){
      if(err) return res.badRequest(err);

      return res.ok("Bạn đã verify email thành công! Vui lòng đăng nhập");
    });
  }
}