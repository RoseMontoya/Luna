# Luna-AA-Capstone

## Database Schema Design

![luna-database-schema]

[luna-database-schema]: ./images/db-schema.png

## Frontend Routes

### Landing Page

`/`

### All entries

`/entries`

### entry details

`/entries/:entriesId`

### Create new entry

`/entries/new`

### edit entry

`/entries/:entriesId` (i want editing to be enable where the info in being showed. Just like editing is being unlocked. but will change to `/entries/:entriesId/edit` if necessary)


## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
     "title": "Login failed",
    "message": "Invalid credentials",
    "errors": {
        "message": "Invalid credentials"
    },
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Bad request",
      "message": "Bad request",
      "errors": {
        "credential": "Email is required",
        "password": "Password is required"
    },
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "User already exists",
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
    },
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Bad request",
    "message": "Bad request",
    "errors": {
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "email": "Invalid email",
        "password": "Password is required"
    },
    }
    ```

## Entries

### Get all entries

Returns all of a user entries.

* Require Authentication: true
* Require proper authorization
* Request
  * Method: GET
  * URL: `/api/entries`
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
        {
          "id": 1,
          "userId": 1,
          "date": "Tuesday, Feb 14",
          "time": "12:18 AM",
          "overallMood": 10,
          "note": "Today was a great day. I went to the beach with friends. I was a bit cool, but still warm enought to walk on the shore line.",
          "iconId": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        },
      ]
    ```

### Get an entry by id

Returns an entry by entry id.

* Require Authentication: true
* Require proper authorization
* Request
  * Method: GET
  * URL: `/api/entries/:entriesId`
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
          "id": 1,
          "userId": 1,
          "date": "Tuesday, Feb 14",
          "time": "12:18 AM",
          "overallMood": 10,
          "note": "Today was a great day. I went to the beach with friends. I was a bit cool, but still warm enought to walk on the shore line.",
          "iconId": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
    ```

### Create a new entry

POST `/api/entries`

### edit an entry

PUT `/api/entries/:entriesId`

### Delete an entry

DELETE `/api/entries/:entriesId`

## Activities

### Get all activities

GET `/api/activities`

Returns all activities that belong to a user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/activites`
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  [
    {
        "id": 1,
        "name": "Meditate",
        "iconId": 1,
        "color": "#126E82",
        "userId": 1,
        "deactivated": false,
    }
  ]
  ```

### Create a new activity

POST `/api/activities`

### Edit an activity

PUT `/api/activities/:activityId`

### Delete an activity

DELETE `/api/activities/:activityId`

### Get all activities by entriesId

GET `/api/entries/:entriesId/activities`
Returns all activities that belong to an entry

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/entries/:entriesId/activities`
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  [
    {
        "id": 1,
        "name": "Meditate",
        "iconId": 1,
        "color": "#126E82",
        "userId": 1,
        "deactivated": false,
    },
  ]
  ```

### Create a new instance of an activity by entriesId

POST `/api/entries/:entriesId/activities`

### Delete a new instance of an activity by entriesId

PUT `/api/entries/:entriesId/activities`

## Levels

### Get all levels

GET `/api/levels`

### Create a new level

POST `/api/levels`

### Edit an level

PUT `/api/levels/:levelId`

### Delete an level

DELETE `/api/levels/:levelId`

### Get all levels by entriesId

GET `/api/entries/:entriesId/levels`

### Create a new instance of a level by entriesId

POST `/api/entries/:entriesId/levels`

### Edit level by entry id

PUT `/api/entries/:entriesId/levels/levelId`

### Delete an instance of a level by entriesId

PUT `/api/entries/:entriesId/activities/:activityId`
