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
    if(user && user.type == User.USER_TYPE.ADMIN){
      return next();
    }

    sails.log.info("User is not admin");
    return res.forbidden('You are not permitted to perform this action.');
  });

};
