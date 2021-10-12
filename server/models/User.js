const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const saltRounds = 10;

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), 'secret');

  user.token = token;

  user.save((err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const model = this;

  // 토큰으로 user를 찾음
  model.findOne({ token }, (err, user) => {
    if (err) return cb(err);

    cb(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
