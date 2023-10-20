## Installation

```bash
 npm install
```


#Deployment Link

https://todo-development.up.railway.app/

## Sample .env File for Development

Create a .env file into the root directory of the project
```plaintext
# Node Environment
NODE_ENV=development

# Database Configuration
DB_USERNAME=my_username
DB_PASSWORD=my_password
DB_NAME=my_database
DB_HOST=my_database_host
DIALECT=mysql
DB_PORT=3306

# Application Secret
SECRET=my_secret_key

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Authentication API Documentation

This API documentation provides details on how to interact with the Authentication API.

## Table of Contents

1. [Sign Up](#sign-up)
2. [Sign In](#sign-in)

---

## Sign Up

Registers a new user.

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- **Response**:

- **Success Response**:

  - **Status Code**: `201 Created`
  - **Body**:

    ```json
    {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **Error Response**:

  - **Status Code**: `400 Bad Request`
  - **Body**:

    ```json
    {
      "statusCode": 400,
      "message": "Email, name, and password are required."
    }
    ```

    ```json
    {
      "statusCode": 400,
      "message": "User is already registered"
    }
    ```

# Sign In

Logs in an existing user.

- **URL**: `/auth/signin`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**:

- **Success Response**:

  - **Status Code**: `200 OK`
  - **Body**:

    ```json
    {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **Error Response**:

  - **Status Code**: `400 Bad Request`
  - **Body**:

    ```json
    {
      "statusCode": 400,
      "message": "Email and password are required."
    }
    ```

    ```json
    {
      "statusCode": 401,
      "message": "Invalid Email or Password"
    }
    ```

# Create a Todo

Creates a new Todo.

- **URL**: `/todos`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (Requires authentication)
- **Request Body**:

  ```json
  {
    "userId": "1",
    "title": "Complete Homework"
  }
  ```

# Get all Todos for a User

Retrieves all Todos associated with a specific user.

- **URL**: `/todos/all/:userId`
- **Method**: `GET`
- **Headers**:

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (Requires authentication)

- **URL Parameters**:

  - `userId` (string): The unique identifier of the user.

- **Response**:

  - **Success Response**:

    - **Status Code**: `200 OK`
    - **Body**:

      ```json
      {
        "userId": "1",
        "title": "Complete Homework"
      }
      ```

  - **Error Response**:

    - **Status Code**: `400 Bad Request`
    - **Body**:

      ```json
      {
        "statusCode": 400,
        "message": "userId is required."
      }
      ```

# Update a Todo

Updates an existing Todo.

- **URL**: `/todos/:id`
- **Method**: `PATCH`
- **Headers**:

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (Requires authentication)

- **URL Parameters**:

  - `id` (string): The unique identifier of the Todo.

- **Request Body**:

  ```json
  {
    "userId": "1",
    "title": "Study for Exam"
  }
  ```

- **Response**:

  - **Success Response**:

    - **Status Code**: `201 OK`
    - **Body**:

      ```json
      {
        "userId": "1",
        "title": "Study for Exam",
        "isDone": true
      }
      ```

  - **Error Response**:

    - **Status Code**: `400 Bad Request`
    - **Body**:

      ```json
      {
        "statusCode": 400,
        "message": "userId is required."
      }
      ```

# Delete a Todo

Deletes an existing Todo.

- **URL**: `/todos/:todoId`
- **Method**: `DELETE`
- **Headers**:

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (Requires authentication)

- **URL Parameters**:

  - `todoId` (string): The unique identifier of the Todo.

- **Response**:

  - **Success Response**:

    - **Status Code**: `200 OK`
    - **Body**:

      ```json
      {
        "message": "Todo deleted successfully."
      }
      ```

  - **Error Response**:

    - **Status Code**: `400 Bad Request`
    - **Body**:

      ```json
      {
        "statusCode": 400,
        "message": "userId is required."
      }
      ```

      ```json
      {
        "statusCode": 400,
        "message": "Todo not found."
      }
      ```
