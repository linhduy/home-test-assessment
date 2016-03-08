var UserAdminSeed = require('./UserAdminSeed');

exports.import = function(){
  if(sails.config.initSeedDataOnStart){
    UserAdminSeed.execute();
  }
  return
}