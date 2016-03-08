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

exports.requestVerifyEmail = function(user, secretKey, done){
  var verifyUrl = 'http://localhost:1337/user/verify'
  var smtpTransport = sails.config.smtpTransport
  var mailOptions = {
    from: '"Admin home test" <whatthemailtest@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Verify Email Using Node.js', // Subject line
    text: "Hello! This is verify mail from home_test project", // plaintext body
    html: '<span>Hello ' + user.name + ',</span><br><span>Vui lòng xác nhận địa chỉ email của bạn để hoàn thành đăng ký với chúng tôi.<span><br><br><a href="' + verifyUrl + '/' + user.email + '/' + secretKey +'">xác nhận ngay</a>' // html body
  };

  smtpTransport.sendMail(mailOptions, function(err, result){
    if(err) return done(err);
    return done(result);
  });
}

exports.approveByAdmin = function(userId, done){
  User.update(userId, {active: true}, function(err, user){
    if(err || !user || user.length == 0) return done("User is not existed");
    return done(null, user);
  });
}

exports.approveByEmail = function(email, secretKey, done){
  User.findOneByEmail(email, function(err, user){
    if(err || !user) return done("User is not existed");

    User.update({email: email}, {active: true}, function(err, result){
      if(err || !result) return done("approve failed");
      return done(null, user);
    })
  });
}
