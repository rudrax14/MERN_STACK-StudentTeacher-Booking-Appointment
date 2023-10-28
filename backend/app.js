const express = require('express');
const errorController = require('./controllers/errorController');
const app = express()
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const studentRoutes = require('./routes/studentRoutes')
const messageRoutes = require('./routes/messageRoutes')
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));




app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/teachers', teacherRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/messages', messageRoutes)

app.use(errorController)

module.exports = app