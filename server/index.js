const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const users = require('./routes/users');
const favorite = require('./routes/favorite');

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

app.use('/api/users', users);
app.use('/api/favorite', favorite);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => console.log(`listening on port ${port}`));
