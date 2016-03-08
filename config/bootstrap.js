/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var SeedData = require(process.cwd()+'/data/Seed');
var nodemailer = require('nodemailer');

module.exports.bootstrap = function(cb) {
  SeedData.import()

  //create smtpTransport for send mail
  sails.config.smtpTransport = nodemailer.createTransport('smtps://whatthemailtest%40gmail.com:nguyenlinhduy@smtp.gmail.com');
  cb();
};
