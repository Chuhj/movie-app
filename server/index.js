const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { User } = require('./models/User');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 db에서 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.json({ loginSuccess: false, msg });

    if (user === null) return res.json({ loginSuccess: false, msg: 'No user' });
    else {
      // 있다면 비밀번호가 같은지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.json({ loginSuccess: false, err });
        if (!isMatch)
          return res.json({ loginSuccess: false, msg: 'wrong password' });

        // 같다면 토큰 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰 쿠키에 저장
          return res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    }
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    token: req.user.token,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, result) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({ logoutSuccess: true });
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
