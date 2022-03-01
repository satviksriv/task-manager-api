# Task Manager API

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Concepts Used](#concepts-used)
- [API Reference](#api-reference)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Tech Stack](#tech-stack)
- [Author](#author)

## Description

This is a RESTful API that allows us to perform CRUD (Create, Read, Update and Delete) operations on users as well as tasks of a particular user.
This API is built using Node.js, Express.js, MongoDB and Mongoose.

## Features

This API has the following features:

- **[Create a new user](#create-a-new-user):** Create a new user with the given name, email and password using the POST method.
- **[Login a existing user](#login-a-existing-user):** Login a user with the given email and password using the POST method.
- **[Logout a user](#logout-a-user-only-if-authorized):** Logout a user using the POST method.
- **[Logout user from all locations](#logout-user-from-all-logged-in-locations-only-if-authorized):** Logout a user from all locations it has logged in using the POST method.
- **[Create a new task for a user](#create-a-new-task-for-a-user-only-if-authorized):** Create a new task for a existing user using the POST method.
- **[Upload an avatar](#upload-an-avatar-only-if-authorized):** Upload an avatar for a user using the POST method.
- **[Read profile](#read-profile-only-if-authorized):** Read the profile of the logged in user by using the GET method.
- **[Read user (Admin only)](#read-user-admin-only-only-if-authorized):** Read the profile of a particular user by its id using the GET method.
- **[Read all tasks of a user](#read-all-tasks-of-a-user-only-if-authorized):** Read all tasks of a existing user using the GET method.
- **[Read a particular task of a user](#read-a-particular-task-of-a-user-only-if-authorized):** Read a particular task of a existing user using the GET method.
- **[Update a user](#update-a-user-only-if-authorized):** Update a user using the PATCH method.
- **[Update a task of a user](#update-a-task-of-a-user-only-if-authorized):** Update a existing task by using the PATCH method.
- **[Delete a user](#delete-a-user-only-if-authorized):** Delete a user by its id using the DELETE method.
- **[Delete a task of a user](#delete-a-task-of-a-user-only-if-authorized):** Delete an existing task by using the DELETE method.
- **[Delete avatar](#delete-avatar-only-if-authorized):** Delete avatar for a user using the DELETE method.

It also contains the authentication middleware that is used to authenticate the user which handles the error if the user is not authenticated.

I have also included tests file which contains the test cases for both the users as well as tasks APIs.

I have also integrated email sending functionality which sends an email whenever a new user is signed up or a user is deleted. I have achieved this by using the [SendInBlue API](https://www.sendinblue.com/).

I have also integrate the API to send the correct source codes according to the output of the operations.

## Concepts Used

- HTTP requests (GET, POST, PATCH, DELETE)
- Accessing query string of a url
- Middleware
- Parsing and sending JSON data back and forth
- Sorting, pagination and filtering data
- Testing
- env variables
- Promises
- Asynchronous Node.JS
- Server side programming through Express.JS

## API Reference

#### Create a new user

```http
  POST /https://satviksriv-task-manager.herokuapp.com/users
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `name`     | `string` | **Required**. User's name     |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### Login a existing user

```http
  POST /https://satviksriv-task-manager.herokuapp.com/users/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### Logout a user (only if authorized)

```http
  POST /https://satviksriv-task-manager.herokuapp.com/users/logout
```

#### Logout user from all logged-in locations (only if authorized)

```http
  POST /https://satviksriv-task-manager.herokuapp.com/users/logoutALL
```

#### Create a new task for a user (only if authorized)

```http
  POST /https://satviksriv-task-manager.herokuapp.com/tasks
```

| Parameter     | Type      | Description                         |
| :------------ | :-------- | :---------------------------------- |
| `description` | `string`  | **Required**. Task description      |
| `completed`   | `boolean` | **Default: false**. User's password |

#### Upload an avatar (only if authorized)

```http
  POST /https://satviksriv-task-manager.herokuapp.com/users/avatar
```

| Parameter | Type         | Description                      |
| :-------- | :----------- | :------------------------------- |
| `avatar`  | `image file` | **Required** Image of the avatar |

#### Read profile (only if authorized)

```http
  GET /https://satviksriv-task-manager.herokuapp.com/users/me
```

#### Read user (Admin only) (only if authorized)

```http
  GET /https://satviksriv-task-manager.herokuapp.com/users/${_id}
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `_id`     | `string` | **Required**. User's id |

#### Read all tasks of a user (only if authorized)

```http
  GET /https://satviksriv-task-manager.herokuapp.com/tasks/?sortBy=*sorting-conditons*
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `sortBy`  | `string` | **Default: createdAt_DESC**. Sorting conditions |

#### Read a particular task of a user (only if authorized)

```http
  GET /https://satviksriv-task-manager.herokuapp.com/tasks/${_id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `_id`     | `string` | **Required**. Task id |

#### Update a user (only if authorized)

```http
  PATCH /https://satviksriv-task-manager.herokuapp.com/users/me
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | New name     |
| `email`    | `string` | New email    |
| `password` | `string` | New password |
| `age`      | `number` | New email    |

#### Update a task of a user (only if authorized)

```http
  PATCH /https://satviksriv-task-manager.herokuapp.com/tasks/${_id}
```

| Parameter     | Type      | Description           |
| :------------ | :-------- | :-------------------- |
| `_id`         | `string`  | **Required**. Task id |
| `description` | `string`  | New description       |
| `completed`   | `boolean` | New value             |

#### Delete a user (only if authorized)

```http
  DELETE /https://satviksriv-task-manager.herokuapp.com/users/me
```

#### Delete a task of a user (only if authorized)

```http
  DELETE /https://satviksriv-task-manager.herokuapp.com/tasks/${_id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `_id`     | `string` | **Required**. Task id |

#### Delete avatar (only if authorized)

```http
  DELETE /https://satviksriv-task-manager.herokuapp.com/users/me/avatar
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/satviksriv/task-manager-api.git
```

Go to the project directory

```bash
  cd task-manager-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SIB_API_KEY`: Your SendInBlue API key

`JWT_SECRET`: Your JWT secret key

`MONGO_URL`: Your MongoDB URL

`PORT`: Your port number

## Running Tests

To run tests, run the following command (you need to set up the test.env file first)

```bash
  npm run test
```

## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Author

- [@satviksriv](https://github.com/satviksriv)
