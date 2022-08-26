const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/event')
const cors = require('cors')
require('dotenv').config()

const db_uri = process.env.DB_URI || 'mongodb://localhost:27017/eventDashboard'
// TODO: Connect to the database: 
mongoose.connect( db_uri , () => {
    console.log("Connected to the database")
})
    // * Check for error in the connection
mongoose.connection.on("error", (err)=> {
    console.log(error)
})  

// TODO : Create express server
const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/events', router)

app.listen(PORT , ()=> {
    console.log("Listening at port 5000")
})