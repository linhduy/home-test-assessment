var fs = require('fs');
exports.list = function(done){
  User.find(function(err, user){
    if(err) return done(err);
    return done(null, user);
  });
}

exports.info = function(userId, done){
  User.findOneById(userId, function(err, user){
    if(err || !user) return done("user is not existed");
    return done(null, user);
  });
}

exports.create = function(params, done){
  if(!params.name) return done("Missing param name");
  if(!params.password) return done("Missing param password");
  if(!params.email) return done("Missing param email");
  if(!params.type) return done("Missing param type");
  if(params.active == null || params.active == 'undefinded') return done("Missing param active");

  cond = {
    '$or': [
      {name: params.name},
      {email: params.email}
    ]
  }
  User.findOne(cond, function(err, user){
    if(err) return done(err);
    if(user) return done("User is existed") ;

    data = {
      name: params.name,
      email: params.email,
      password: params.password,
      type: params.type,
      active: params.active,
      activeCode: params.activeCode || null
    }
    User.create(data, function(err, user){
      if(err) return done(err);
      return done(null, user);
    });
  });
}

exports.update = function(params, done){
  dataUpdate = {}
  if(!params.userId) return done("Missing params userId");
  if(params.name) dataUpdate.name = params.name;
  if(params.password) dataUpdate.password = params.password;
  if(params.email) dataUpdate.email = params.email;

  cond = {id: params.userId}

  User.findOne(cond, function(err, user){
    if(err) return done(err);
    if(!user) return done("User is not existed");

    User.update(cond, dataUpdate, function(err, user){
      if(err) return done(err);
      return done(null, user);
    });
  });
}

exports.delete = function(userId, done){
  cond = {id: userId}
  User.findOne(cond, function(err, user){
    if(err) return done(err);
    if(!user) return done("User is not existed");

    User.destroy(userId, function(err, user){
      if(err) return done(err);
      return done(null, user);
    });
  });
}

exports.exportToCSV = function(done){
  var process = require('child_process');

  var limit = 1, count = 0, skip = 0;

  var db = 'home_test';
  var collection = 'user';
  var type = 'csv';

  User.count({}, function(err, userQuantity){
    do{
      cmd = 'mongoexport --db ' + db + ' --collection ' + collection + ' --limit ' + limit + ' --skip ' + skip + ' --type=' + type + ' --fieldFile userExportFields.txt --out user' + count + '.csv';
      process.exec(cmd,function (err,stdout,stderr) {
        if (err) sails.log.error(stderr);
      });
      count = count + 1;
      skip = limit * count;
    }
    while(skip < userQuantity);

    return done(null, true);
  });
}