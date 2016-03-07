var bcrypt = require('bcrypt');

exports.authenticate = function(email, password, done){
  if(!email || !password) return done("Missing email or password");
  User.findOne({email: email}, function(err, user){
    if(err || !user) return done("User is not existed");
    bcrypt.compare(password, user.password, function(err, result){
      if(err || !result) return done("login failed");
      return done(null, user.toJSON())
    });
  });
}