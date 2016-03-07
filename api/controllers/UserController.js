
module.exports = {
  list: function(req, res){
    UserService.list(function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

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
    UserService.register(params, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  update: function(req, res){
    params = req.allParams();
    UserService.update(params, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  delete: function(req, res){
    userId = req.param('id');
    UserService.delete(userId, function(err, result){
      if(err) return res.badRequest(err);
      return res.ok(result);
    });
  },

  exportToPDF: function(req, res){},

  exportToCSV: function(req, res){},
}