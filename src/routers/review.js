const express = require('express');
const auth = require('../middlewares/auth');
const router = new express.Router()

const Review = require('../models/review')

//Get all Review

router.get('/reviews', async (req, res) => {
    try {
        const data = await Review.find();
        const page = req.query.page;
        const size = parseInt(req.query.size);
        let reviews = [];
        const count = await Review.count();
        if (page) {
            reviews = await data.skip(page * size).limit(size).toArray();
        }
        else {
            reviews = data;
        }
        res.send({
            count,
            reviews: reviews
        });
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET Single Review API
router.get('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findOne({ _id: id });
        res.send(review);
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Post Review

router.post('/reviews', auth, async (req, res) => {
    const review = new Review(req.body)

    try {
        await review.save()
        res.status(201).send(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE Review
router.delete('/reviews/:id', auth, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id })
        if (!review) {
            return res.status(404).send()
        }

        res.send(review)
    } catch (e) {
        res.status(500).send()
    }
})

// UPDATE API
router.put('/reviews/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Review.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;