const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//* Create a user
app.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

//* Fetch multiple users
app.get("/users", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
})

//* Fetch individual user by id
app.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        //! If _id is less than 12 characters then mongoose will show an error. This is a bug and needs to be fixed
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }

})

//* Create a task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

//* Fetch multiple tasks
app.get("/tasks", async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
})

//* Fetch individual task by id
app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        //! If _id is less than 12 characters then mongoose will show an error. This is a bug and needs to be fixed
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

})

app.listen(port, () => {
    console.log("Server is up on port", port);
})