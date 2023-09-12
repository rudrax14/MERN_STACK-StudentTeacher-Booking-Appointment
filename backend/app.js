// express connection
const express = require('express');
const app = express()
// mongo connection
const connectToMongo = require('./db')
connectToMongo()
const errorController = require('./controllers/errorController');
app.use(express.json())


// Available Routes
app.use('/api/v1/admin',require('./routes/adminRoutes'));
app.use('/api/v1/teachers',require('./routes/teacherRoutes'));
app.use('/api/v1/student',require('./routes/studentRoutes'));

app.use(errorController)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})