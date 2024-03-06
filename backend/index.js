const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = require('./app')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB Connected');
  }).catch((err) => {
    console.log(err)
  });


const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Welcome to the Tutor-Time API!')
})

app.listen(port, () => {
  console.log('App listening on port ' + port)
})