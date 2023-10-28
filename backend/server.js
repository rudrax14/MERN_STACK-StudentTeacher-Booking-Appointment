const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
<<<<<<< HEAD
    console.log('Successful');
=======
    console.log('Successful Here We Go');
>>>>>>> 0fc727597e315911710b602277815d2fbe09048d
  }).catch((err) => {
    console.log(err)
  });


const port = process.env.PORT || 5000

<<<<<<< HEAD
app.listen(port, () => {
  console.log('Listening' + port)
=======
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
>>>>>>> 0fc727597e315911710b602277815d2fbe09048d
})