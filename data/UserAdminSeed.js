var createAdminUser = function(dataCreateUserAdmin){
  User.create(dataCreateUserAdmin, function(err, admin){
    if(err) sails.log.error(err);
  });
  return;
};

exports.execute = function(cb){
  sails.log.info('GAME CONFIGURATION SEED EXECUTING...........................');

  var dataCreateUserAdmin = {
    name: "admin",
    passchaword: "admin",
    email: "admin@gmail.com",
    type: User.USER_TYPE.ADMIN,
    active: true
  };

  cond = {
    '$or': [
      {name: dataCreateUserAdmin.name},
      {email: dataCreateUserAdmin.email}
    ]
  };

  User.findOne(cond, function(err, admin){
    if(!err && !admin){
      createAdminUser(dataCreateUserAdmin);
    }
  });
  return;
}