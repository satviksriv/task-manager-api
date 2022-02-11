const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send("GET requests disabled");
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send("Site is under maintenance mode, Please try back soon.");
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port", port);
})

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
    // const task = await Task.findById("6206c0a6b2f02e621ef46959");
    // await task.populate("owner");
    // console.log(task.owner);

    const user = await User.findById("6206bfd99c7c3b43ff92fac1");
    await user.populate("tasks");
    console.log(user.tasks);
}

main();