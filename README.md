# Uber Clone Backend

## Overview

This backend service provides the necessary endpoints for user registration and authentication for the Uber Clone application. It is built using Node.js, Express, and MongoDB.

## User Registration Route

### Endpoint

`POST /api/user/register`

### Description

This endpoint allows a new user to register by providing their first name, last name, email, and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `fullName.firstName` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullName.lastName` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 5 characters long.

Example:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

- `201 Created`: If the user is successfully registered, the response will contain the user object and an authentication token.
- `400 Bad Request`: If there are validation errors, the response will contain an array of error messages.

Example:

```json
{
  "user": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Validation

The following validations are applied to the request body:

- `email`: Must be a valid email format.
- `fullName.firstName`: Must be at least 3 characters long.
- `password`: Must be at least 5 characters long.

### Error Handling

If the request body fails validation, the response will contain an array of error messages indicating which fields are invalid.

Example:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## User Login Route

### Endpoint

`POST /api/user/login`

### Description

This endpoint allows an existing user to log in by providing their email and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 5 characters long.

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

- `200 OK`: If the user is successfully authenticated, the response will contain the user object and an authentication token.
- `400 Bad Request`: If there are validation errors, the response will contain an array of error messages.
- `401 Unauthorized`: If the email or password is incorrect, the response will contain an error message.

Example:

```json
{
  "user": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Validation

The following validations are applied to the request body:

- `email`: Must be a valid email format.
- `password`: Must be at least 5 characters long.

### Error Handling

If the request body fails validation, the response will contain an array of error messages indicating which fields are invalid.

Example:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

If the email or password is incorrect, the response will contain an error message.

Example:

```json
{
  "message": "Invalid email or password"
}
```

## Setup

### Dependencies

- `express`: Web framework for Node.js.
- `express-validator`: Middleware for validating and sanitizing request data.
- `mongoose`: MongoDB object modeling tool.
- `dotenv`: Module to load environment variables from a `.env` file.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/uber-clone-backend.git
   cd uber-clone-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:

   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=your_port_no
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Project Structure

- `server.js`: Entry point of the application.
- `app.js`: Express application setup.
- `db/db.config.js`: Database connection configuration.
- `routes/user.routes.js`: User registration and login routes.
- `controller/user.controller.js`: User registration and login controllers.
- `services/user.services.js`: User service for creating a new user.
- `models/user.model.js`: User model definition.

## Contact

For any questions or issues, please contact the backend team.
