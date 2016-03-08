/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow admin user action
 *
 */
module.exports = function(req, res, next) {
  var userId = req.session.userId;
  User.findOneById(userId, function(err, user){
    if(user && user.active){
      return next();
    }
    sails.log.info("User are not approved");
    return res.forbidden('You are not permitted to perform this action.');
  });

};
