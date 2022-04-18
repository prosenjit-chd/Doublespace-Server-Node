const express = require('express');
const router = express.Router();


const Utilities = require('../models/utilities');

/* -------utilities------ */
// GET Utilities


//Get all Method

router.get('/utilities', async (req, res) => {
    try {
        const data = await Utilities.find();
        const page = req.query.page;
        const size = parseInt(req.query.size);
        let utilities = [];
        const count = await Utilities.count();
        if (page) {
            utilities = await data.skip(page * size).limit(size).toArray();
        }
        else {
            utilities = data;
        }
        res.send({
            count,
            utilities: utilities
        });
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET Single Utilities API
router.get('/utilities/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const utilities = await Utilities.findOne({ _id: id });
        res.send(utilities);
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//POST Utilities

router.post('/utilities', async (req, res) => {
    const utilities = new Utilities(req.body)
    try {
        await utilities.save()
        res.status(201).send(utilities)
    } catch (e) {
        res.status(400).send(e)
    }
})


// UPDATE API
router.put('/utilities/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Utilities.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;