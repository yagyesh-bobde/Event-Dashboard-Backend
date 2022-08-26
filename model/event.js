const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    name: {type: String , required: true},
    banner: { type: String, required: true },
    short_desc: {type: String, required: true},
    long_desc: { type: String, required: true },
    lang: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String , required: true},
    link: { type: String, required: true },
})

module.exports = mongoose.model("Events" , eventSchema)