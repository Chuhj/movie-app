const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 요청에서 토큰을 가져옴
  const token = req.cookies.x_auth;
  // 토큰으로 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) return res.json({ isAuth: false, err });
    if (!user) return res.json({ isAuth: false, err: 'no user' });
    // 유저가 있다면 req에 넣어 next()
    req.token = token;
    req.user = user;
    console.log(user, user.token);
    next();
  });
};

module.exports = { auth };
