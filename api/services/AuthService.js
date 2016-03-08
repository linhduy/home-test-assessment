var bcrypt = require('bcrypt');

exports.authenticate = function(email, password, done){
  if(!email || !password) return done("Missing email or password");

  User.findOne({email: email}, function(err, user){
    if(err || !user) return done("User is not existed");

    bcrypt.compare(password, user.password, function(err, result){
      if(err || !result) return done("login failed");

      if(!user.active) return done("User are not approved");

      return done(null, user.toJSON())
    });
  });
}

exports.approveByAdmin = function(userId, done){
  User.update(userId, {active: true}, function(err, user){
    if(err || !user || user.length == 0) return done("User is not existed");
    return done(null, user);
  });
}

exports.approveByEmail = function(email, secretKey, done){

}
