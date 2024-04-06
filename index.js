const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const authRoutes = require('./public/routes/authRoutes');
const { createUser } = require('./utils/testuser');
require('dotenv').config(); 
const PORT = 5000
// dont vex reading my codes I just like to comment....lormy

//middle
app.use(express.json());
app.use(express.json({ extended: true }))
app.use(cookieParser());


db()
createUser()

//routes
app.use('/api/auth', authRoutes);

app.listen(PORT,()=>{
    console.log(`port ${PORT} working, roger!`);
    
})

