const express = require('express')
const Events = require('../model/event')


// INITIALIZE THE ROUTER
const router = express.Router()

// TODO: Route 0 : GET all events '/api/events/all'
router.get('/all', async(req, res)=> {
    let success = false
    try {
        const allEvents = await Events.find()
        success = true
        res.send({ success , res: allEvents })
    } catch (error) {
        res.status(404).send({ success , error: 'Internal Server Error' })
    }
})

// TODO: ROUTE 1 : Create a event '/api/events/createEvent'
router.post('/createEvent' , async(req,res)=> {
    let success = false;
    try {
        const { name, banner, short_desc, long_desc, lang, eventDate, eventTime, link } = req.body;
        const newEvent = await Events.create(
            {
                name, banner, short_desc, long_desc, lang, eventDate, eventTime, link
            }
        )
        success = true
        res.send({ success, res: newEvent })

    } catch (error) {
        return res.send({ success, error })
    }
})
// TODO: ROUTE 2: Read a Journal Entry : /api/events/:id 
router.get('/:id', async (req, res) => {
    var success = false
    try {
        let event = await Events.findById(req.params.id)
        if (!event) {
            return res.status(404).send({ success, error: 'Not Found' })
        }

        success = true
        return res.send({ success, res: event })

    } catch (error) {
        return res.status(500).send({ success, error: 'Internal Server Error' })
    }
})



// TODO: ROUTE 3: Update an Event: /api/events/updateEvent/:id 
router.put('/updateEvent/:id', async (req, res) => {
    var success = false
    try {
        const newEvent = {
            ...req.body
        }

        let old_entry = await Events.findById(req.params.id);
        if (!old_entry) {
            return res.status(404).send({ success, error: 'Not Found' })
        }
        success = true
        const update_entry = await Events.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true })
        return res.send({ success, res: update_entry })
    } catch (error) {
        return res.status(500).send({ success, error: 'Internal Server Error' })
    }

})

// TODO: ROUTE 4: Delete an Event: /api/events/deleteEvent/:id  
router.delete('/deleteEvent/:id', async (req, res) => {
    let success = false
    try {
        let event = await Events.findById(req.params.id)
        if (!event) {
            return res.status(404).send({success, error:'Not Found'})
        }

        event = await Events.findByIdAndDelete(req.params.id)
        success = true
        return res.send({ success, res: event })

    } catch (error) {
        res.status(500).send({ success, error: 'Internal Server Error' })
    }
})


module.exports = router;