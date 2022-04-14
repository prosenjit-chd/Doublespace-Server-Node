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


// Post Review

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

module.exports = router;