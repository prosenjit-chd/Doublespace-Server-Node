const express = require('express')
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


// Post Review

router.post('/reviews', async (req, res) => {
    const review = new Review(req.body)

    try {
        await review.save()
        res.status(201).send(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE Review
router.delete('/reviews/:id', async (req, res) => {
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

module.exports = router;