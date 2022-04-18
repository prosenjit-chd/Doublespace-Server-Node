const express = require('express')
const router = new express.Router()

const Team = require('../models/team')

//Get all Team

router.get('/teams', async (req, res) => {
    try {
        const data = await Team.find();
        const page = req.query.page;
        const size = parseInt(req.query.size);
        let teams = [];
        const count = await Team.count();
        if (page) {
            teams = await data.skip(page * size).limit(size).toArray();
        }
        else {
            teams = data;
        }
        res.send({
            count,
            teams: teams
        });
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET Single Project API
router.get('/teams/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Team.findOne({ _id: id });
        res.send(team);
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Post Team

router.post('/teams', async (req, res) => {
    const teams = new Team(req.body)

    try {
        await teams.save()
        res.status(201).send(teams)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE Review
router.delete('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({ _id: req.params.id })
        if (!team) {
            return res.status(404).send()
        }

        res.send(team)
    } catch (e) {
        res.status(500).send()
    }
})

// UPDATE API
router.put('/teams/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Team.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;