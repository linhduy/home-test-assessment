var _ = require('lodash')
var bcrypt = require('bcrypt');
USER_TYPE = {
  ADMIN: 'ADMIN',
  REGULAR: 'REGULAR'
}

module.exports = {
  schema: true,
  USER_TYPE: USER_TYPE,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    type: {
      type: 'string',
      enum: _.values(USER_TYPE),
      required: true
    },
    active: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    activeCode: {
      type: 'string',
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.activeCode;
      delete obj.type;
      return obj
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },

  beforeUpdate: function(user, cb) {
    if(!user.password) {
      cb(null, user);
    }
    else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          }else{
            user.password = hash;
            cb(null, user);
          }
        });
      });
    }
  }
}