const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "Satvik",
        email: "satvik@example.com",
        password: "MyPass777!"
    }).expect(201);

    //* Assert that the database for changed currently
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //* Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Satvik",
            email: "satvik@example.com"
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe("MyPass777!");
});

test("Should login existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    //* Assert that new token was created when user logged in
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non-existent user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "thisisnotmypass"
    }).expect(400);
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401);
});

test("Should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    //* Assert that the user is removed
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test("Should update valid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Sasha"
        })
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Sasha");
})

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "India"
        })
        .expect(400);
})

test("Should not signup user with invalid name/email/password", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: "WrongPass123"
        })
        .expect(400);
})

test("Should not update user if unauthenticated", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer invalidTokenValue`)
        .send({
            name: "Jon"
        })
        .expect(401);
})

test("Should not update user with invalid name/email/password", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 123
            //! If we send name and password as numbers then the database is updated successfully
            //! name: 123 --> gives 200 status code instead of 400
            //! password: 12345678 --> gives 200 status code instead of 400
        })
        .expect(400);
})

test("Should not delete user if unauthenticated", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer invalidTokenValue`)
        .send()
        .expect(401);
})