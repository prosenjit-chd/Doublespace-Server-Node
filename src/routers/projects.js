const express = require('express');
const router = express.Router();


const Project = require('../models/projects');

/* -------product------ */
// GET All Project API

router.get('/projects', async (req, res) => {
    try {
        const data = await Project.find();
        const page = req.query.page;
        const size = parseInt(req.query.size);
        let projects = [];
        const count = await Project.count();
        if (page) {
            projects = await data.skip(page * size).limit(size).toArray();
        }
        else {
            projects = data;
        }
        res.send({
            count,
            projects: projects
        });
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET Single Project API
router.get('/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await Project.findOne({ _id: id });
        res.send(project);
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//POST Add Project Admin API 
router.post('/projects', async (req, res) => {
    const project = new Project(req.body)

    try {
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE Project
router.delete('/projects/:id', async (req, res) => {
    try {
        // const task = await Task.findOne({ _id:req.params.id, owner: req.user._id })
        const project = await Project.findOneAndDelete({ _id: req.params.id })
        if (!project) {
            return res.status(404).send()
        }

        // task.remove()

        res.send(project)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;