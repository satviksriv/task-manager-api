const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//* Create a user
app.post("/users", (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//* Fetch multiple users
app.get("/users", (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send();
    });
})

//* Fetch individual user by id
app.get("/users/:id", (req, res) => {
    const _id = req.params.id;

    //! If _id is less than 12 characters then mongoose will show an error. This is a bug and needs to be fixed
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(500).send()
    })
})

//* Create a task
app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//* Fetch multiple tasks
app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send();
    })
})

//* Fetch individual task by id
app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;

    //! If _id is less than 12 characters then mongoose will show an error. This is a bug and needs to be fixed
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.listen(port, () => {
    console.log("Server is up on port", port);
})