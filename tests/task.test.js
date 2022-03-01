const request = require("supertest");
const { resource } = require("../src/app");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From my test"
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test("Should get tasks for a particular user", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(2);
});

test("Should not delete unauthorized tasks", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

test("Should not create task with invalid description/completed", async () => {
    await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 12321,
            completed: "not completed"
        })
        .expect(400);
});

test("Should not update task with invalid description/completed", async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 12321,
            completed: "not completed"
        })
        .expect(400);
});

test("Should delete user task", async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const task = await Task.findById(response.body._id)
    expect(task).toBeNull();
});

test("Should not delete task if unauthenticated", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer invalidWebToken`)
        .send()
        .expect(401);
});

test("Should not update other users task", async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: "Updated description",
            completed: true
        })
        .expect(404);
});

// Task Test Ideas
//
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks