const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config({ path: './.env' });

app.use(cors({ origin: true, credentials: true }));

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB Connected');
  }).catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the Tutor-Time API!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/messages', messageRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log('App listening on port ' + port);
});

module.exports = app;
