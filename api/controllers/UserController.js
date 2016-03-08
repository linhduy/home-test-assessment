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
    UserService.create(params, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  update: function(req, res){
    params = req.allParams();
    params.userId = req.session.userId;
    UserService.update(params, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  }
}