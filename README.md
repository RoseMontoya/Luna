# Luna-AA-Capstone

## Database Schema Design

![luna-database-schema]

[luna-database-schema]: ./images/luna-db-schema.png

## Frontend Routes

### Landing Page

`/`

###

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

- **Purpose:** endpoints that require authentication
- **Error Response:** Require authentication
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

- **Purpose:** All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).
- **Error Response:** Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

## Session

### Get the Current User

- **Purpose:** Returns the information about the current user that is logged in.
- **Require Authentication:** false
- **Request:**
  * **Method:** GET
  * **URL:** `/api/session`
  * **Body:** none

- **Successful Response:** when there is a logged in user
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

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

- **Successful Response:** when there is no logged in user
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "user": null
    }
    ```

### Log In a User

- **Purpose:** Logs in a current user with valid credentials and returns the current user's information.
- **Require Authentication:** false
- **Request:**
  * **Method:** POST
  * **URL:** `/api/session`
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

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

- **Error Response:** Invalid credentials
  * **Status Code:** 401
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
     "title": "Login failed",
    "message": "Invalid credentials",
    "errors": {
        "credentials": "Invalid credentials"
    },
    }
    ```

- **Error response:** Body validation errors
  * **Status Code:** 400
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "title": "Validation error",
      "message": "Validation error",
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
    },
    }
    ```

### Sign Up a User

- **Purpose:** Creates a new user, logs them in as the current user, and returns the current user's information.
- **Require Authentication:** false
- **Request:**
  * **Method:** POST
  * **URL:** `/api/users`
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

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

- **Error response:** User already exists with the specified email
  * **Status Code:** 500
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "title": "User already exists",
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
    },
    }
    ```

- **Error response:** Body validation errors
  * **Status Code:** 400
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "title": "Validation error",
    "message": "Validation error",
    "errors": {
        "firstName": "First Name is required" || "Name must be at least 2 characters long." || "Name cannot be longer than 30 characters.",
        "lastName": "Last Name is required" || "Name must be at least 2 characters long." || "Name cannot be longer than 75 characters.",
        "email": "Email is required" || "Please provide a valid email.",
        "password": "Password is required" || "Password must be at least 6 characters."
    },
    }
    ```

### Log Out a User
- **Purpose:** Log out user
- **Require Authentication:** false
- **Request:**
  * **Method:** DELETE
  * **URL:** `/api/session`
  * **Headers:** none
  * **Body:** none

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "success"
    }
    ```

## Entries

### Get all entries

- **Purpose:** Returns all of a user entries.
- **Require Authentication:** true
- *Require proper authorization*
- **Request:**
  * **Method:** GET
  * **URL:** `/api/users/:userId/entries`
  * **Body:** none

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    [
      {
        "EntryActivities": [
          { "entryId": 33, "activityId": 18 },
          { "entryId": 33, "activityId": 19 },
        ],
        "EntryLevels": [
          { "entryId": 33, "levelId": 6, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
          { "entryId": 33, "levelId": 7, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
        ],
        "date": "Monday, Sep 2",
        "datetime": "2024-09-03T02:13:00.000Z",
        "iconId": 9,
        "id": 33,
        "mood": "Okay",
        "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
        "overallMood": 3,
        "time": "7:13 PM",
        "userId": 4
      },
    ]
    ```

### Get all entries for today for a user
- **Purpose:** Returns all of a user's entries for the current day.
- **Require Authentication:** true
- *Require proper authorization*
- **Request:**
  * Method: GET
  * URL: `/api/users/:userId/today`
  * Body: none

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    [
      {
        "EntryActivities": [
          { "entryId": 33, "activityId": 18 },
          { "entryId": 33, "activityId": 19 },
        ],
        "EntryLevels": [
          { "entryId": 33, "levelId": 6, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
          { "entryId": 33, "levelId": 7, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
        ],
        "date": "Monday, Sep 2",
        "datetime": "2024-09-03T02:13:00.000Z",
        "iconId": 9,
        "id": 33,
        "mood": "Okay",
        "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
        "overallMood": 3,
        "time": "7:13 PM",
        "userId": 4
      },
    ]
    ```

### Get an entry by id

- **Purpose:** Returns an entry by entry id.
- **Require Authentication:** true
- *Require proper authorization*
- **Request:**
  * Method: GET
  * URL: `/api/entries/:entriesId`
  * Body: none

- **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
      {
        "EntryActivities": [
          { "entryId": 33, "activityId": 18 },
          { "entryId": 33, "activityId": 19 },
        ],
        "EntryLevels": [
          { "entryId": 33, "levelId": 6, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
          { "entryId": 33, "levelId": 7, "rating": 4, "createdAt": "2024-09-03T02:14:33.714Z" },
        ],
        "date": "Monday, Sep 2",
        "datetime": "2024-09-03T02:13:00.000Z",
        "iconId": 9,
        "id": 33,
        "mood": "Okay",
        "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
        "overallMood": 3,
        "time": "7:13 PM",
        "userId": 4
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
