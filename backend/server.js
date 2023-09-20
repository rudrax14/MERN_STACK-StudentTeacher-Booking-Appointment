const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app=require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.db_conn)
  .then(() => {
    console.log('Successful');
  }).catch((err)=>{
    console.log(err)
  });




app.listen('8000',()=>{
    console.log('Listening')
})