const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Successful');
  }).catch((err) => {
    console.log(err)
  });


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Listening' + port)
})