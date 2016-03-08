/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  console.log("req.session");
  console.log(req.session);
  if (req.session.authenticated) {
    return next();
  }

  sails.log.info("session invalid");
  return res.forbidden('You are not permitted to perform this action.');
};
