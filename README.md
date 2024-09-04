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

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

- **Purpose:** All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).
- **Error Response:** Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

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

  - **Method:** GET
  - **URL:** `/api/session`
  - **Body:** none

- **Successful Response:** when there is a logged in user

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com"
      }
    }
    ```

- **Successful Response:** when there is no logged in user

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "user": null
    }
    ```

### Log In a User

- **Purpose:** Logs in a current user with valid credentials and returns the current user's information.
- **Require Authentication:** false
- **Request:**

  - **Method:** POST
  - **URL:** `/api/session`
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com"
      }
    }
    ```

- **Error Response:** Invalid credentials

  - **Status Code:** 401
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "title": "Login failed",
      "message": "Invalid credentials",
      "errors": {
        "credentials": "Invalid credentials"
      }
    }
    ```

- **Error response:** Body validation errors

  - **Status Code:** 400
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "title": "Validation error",
      "message": "Validation error",
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

- **Purpose:** Creates a new user, logs them in as the current user, and returns the current user's information.
- **Require Authentication:** false
- **Request:**

  - **Method:** POST
  - **URL:** `/api/users`
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com"
      }
    }
    ```

- **Error response:** User already exists with the specified email

  - **Status Code:** 500
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "title": "User already exists",
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- **Error response:** Body validation errors

  - **Status Code:** 400
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

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

  - **Method:** DELETE
  - **URL:** `/api/session`
  - **Headers:** none
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "message": "success"
    }
    ```

## Entries

### Get all entries

- **Purpose:** Returns all of a user entries.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** GET
  - **URL:** `/api/users/:userId/entries`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    [
      {
        "EntryActivities": [
          { "entryId": 33, "activityId": 18 },
          { "entryId": 33, "activityId": 19 }
        ],
        "EntryLevels": [
          {
            "entryId": 33,
            "levelId": 6,
            "rating": 4,
            "createdAt": "2024-09-03T02:14:33.714Z"
          },
          {
            "entryId": 33,
            "levelId": 7,
            "rating": 4,
            "createdAt": "2024-09-03T02:14:33.714Z"
          }
        ],
        "datetime": "2024-09-03T02:13:00.000Z",
        "iconId": 9,
        "id": 33,
        "mood": "Okay",
        "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
        "overallMood": 3,
        "userId": 4
      }
    ]
    ```

### Get all entries for today for a user

- **Purpose:** Returns all of a user's entries for the current day.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - Method: GET
  - URL: `/api/users/:userId/today`
  - Body: none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    [
      {
        "EntryActivities": [
          { "entryId": 33, "activityId": 18 },
          { "entryId": 33, "activityId": 19 }
        ],
        "EntryLevels": [
          {
            "entryId": 33,
            "levelId": 6,
            "rating": 4,
            "createdAt": "2024-09-03T02:14:33.714Z"
          },
          {
            "entryId": 33,
            "levelId": 7,
            "rating": 4,
            "createdAt": "2024-09-03T02:14:33.714Z"
          }
        ],
        "datetime": "2024-09-03T02:13:00.000Z",
        "iconId": 9,
        "id": 33,
        "mood": "Okay",
        "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
        "overallMood": 3,
        "userId": 4
      }
    ]
    ```

### Get an entry by id

- **Purpose:** Returns an entry by entry id.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** GET
  - **URL:** `/api/entries/:entriesId`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "EntryActivities": [
        { "entryId": 33, "activityId": 18 },
        { "entryId": 33, "activityId": 19 }
      ],
      "EntryLevels": [
        {
          "entryId": 33,
          "levelId": 6,
          "rating": 4,
          "createdAt": "2024-09-03T02:14:33.714Z"
        },
        {
          "entryId": 33,
          "levelId": 7,
          "rating": 4,
          "createdAt": "2024-09-03T02:14:33.714Z"
        }
      ],
      "datetime": "2024-09-03T02:13:00.000Z",
      "iconId": 9,
      "id": 33,
      "mood": "Okay",
      "note": "Had an amazing dinner with Ben. Feeling lucky to have such a supportive partner.",
      "overallMood": 3,
      "userId": 4
    }
    ```

### Create a new entry

- **Purpose:** Creates a new entry for a user
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** POST
  - **URL:** `/api/entries`
  - **Body:**

  ```json
  {
    "activities": [24, 25, 19],
    "datetime": "Wed Sep 04 2024 10:22:22 GMT-0700 (Pacific Daylight Time)",
    "iconId": 4,
    "levels": [
      { "levelId": 6, "rating": 8 },
      { "levelId": 7, "rating": 8 },
      { "levelId": 8, "rating": 6 },
      { "levelId": 9, "rating": 8 },
      { "levelId": 10, "rating": 8 }
    ],
    "mood": "Determined",
    "note": "I am going to work really hard and get an amazing job!",
    "overallMood": "8"
  }
  ```

- **Successful Response:**

  - **Status Code:** 201
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

  ```json
    {
      "EntryActivities": [
        { "entryId": 35, "activityId": 19 },
        { "entryId": 35, "activityId": 24 },
        { "entryId": 35, "activityId": 25 }
      ],
      "EntryLevels": [
        {
          "entryId": 35,
          "levelId": 6,
          "rating": 8,
          "createdAt": "2024-09-04T17:23:35.587Z"
        },
        {
          "entryId": 35,
          "levelId": 7,
          "rating": 8,
          "createdAt": "2024-09-04T17:23:35.587Z"
        }
      ],
      "createdAt": "2024-09-04T17:23:35.570Z",
      "datetime": "2024-09-04T17:22:22.032Z",
      "iconId": 4,
      "id": 35,
      "mood": "Determined",
      "note": "I am going to work really hard and get an amazing job!",
      "overallMood": 8,
      "updatedAt": "2024-09-04T17:23:35.570Z",
      "userId": 4
    }
  ```

### edit an entry

- **Purpose:** Edits a previous entry from a user
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** PUT
  - **URL:** `/api/entries/:entriesId`
  - **Body:**

  ```json
  {
    "activities": [24, 25, 19],
    "datetime": "2024-09-04 10:22",
    "iconId": 4,
    "levels": [
      { "levelId": 6, "rating": 8 },
      { "levelId": 7, "rating": 8 },
      { "levelId": 8, "rating": 6 },
      { "levelId": 9, "rating": 8 },
      { "levelId": 10, "rating": 8 }
    ],
    "mood": "Determined",
    "note": "I am going to work really hard and get an amazing job!",
    "overallMood": "8"
  }
  ```

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "EntryActivities": [
        { "entryId": 35, "activityId": 19 },
        { "entryId": 35, "activityId": 24 },
        { "entryId": 35, "activityId": 25 }
      ],
      "EntryLevels": [
        {
          "entryId": 35,
          "levelId": 6,
          "rating": 8,
          "createdAt": "2024-09-04T17:23:35.587Z"
        },
        {
          "entryId": 35,
          "levelId": 7,
          "rating": 8,
          "createdAt": "2024-09-04T17:23:35.587Z"
        }
      ],
      "createdAt": "2024-09-04T17:23:35.570Z",
      "datetime": "2024-09-04T17:22:22.032Z",
      "iconId": 4,
      "id": 35,
      "mood": "Determined",
      "note": "I am going to work really hard and get an amazing job!",
      "overallMood": 8,
      "updatedAt": "2024-09-04T17:23:35.570Z",
      "userId": 4
    }
    ```

### Delete an entry
- **Purpose:** Deletes a previous entry
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** DELETE
  - **URL:** `/api/entries/:entriesId`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "message": "Success"
    }
    ```

## Icons

### Get all Icons
- **Purpose:** Returns all icons
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** GET
  - **URL:** `/api/icons`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    [
      {
        "createdAt": "2024-09-02T22:42:48.336Z",
        "description": "Laugh beam face",
        "id": 1,
        "name": "FaRegFaceLaughBeam",
        "updatedAt": "2024-09-02T22:42:48.336Z"
      },
    ]
    ```

## Activities

### Get all activities
- **Purpose:** Returns all activities that belong to a user.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** GET
  - **URL:** `/api/activities`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
  [
    {
      "deactivated": false,
      "iconId": 37,
      "id": 25,
      "name": "Work",
      "userId": 4
    }
  ]
  ```

### Create a new activity

- **Purpose:** Creates and return a new activity.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** POST
  - **URL:** `/api/activities`
  - **Body:**
  ```json
  {
    "iconId": 34,
    "id": undefined,
    "name": "school"
  }
  ```

- **Successful Response:**

  - **Status Code:** 201
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
    {
      "createdAt": "2024-09-04T18:21:06.665Z",
      "deactivated": false,
      "iconId": 34,
      "id": 77,
      "name": "school",
      "updatedAt": "2024-09-04T18:21:06.665Z",
      "userId": 4
    }
  ```

### Edit an activity

- **Purpose:** Update and returns an activity
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** PUT
  - **URL:** `/api/activities/:activityId`
  - **Body:**
  ```json
  {
    "iconId": 34,
    "id": 77,
    "name": "school"
  }
  ```

- **Successful Response:**

  - **Status Code:** 201
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
    {
      "deactivated": false,
      "iconId": 34,
      "id": 77,
      "name": "school",
      "userId": 4
    }
  ```

### Delete an activity
- **Purpose:** Deletes an activity
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** DELETE
  - **URL:** `/api/activities/:activityId`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "message": "Success"
    }
    ```

## Levels

### Get all levels

- **Purpose:** Returns all levels that belong to a user.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** GET
  - **URL:** `/api/levels`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
  [
    {
      "color": "#FFEA00",
      "deactivated": false,
      "id": 7,
      "name": "Energy",
      "updatedAt": "2024-09-02T22:42:48.381Z",
      "userId": 4
    },
  ]
  ```

### Create a new level

- **Purpose:** Creates and return a new level.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** POST
  - **URL:** `/api/levels`
  - **Body:**
  ```json
  {
    "name": "Pain"
  }
  ```

- **Successful Response:**

  - **Status Code:** 201
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
    {
      "createdAt": "2024-09-04T18:21:06.665Z",
      "color": "#FFEA00",
      "deactivated": false,
      "id": 23,
      "name": "pain",
      "updatedAt": "2024-09-02T22:42:48.381Z",
      "userId": 4
    }
  ```

### Edit an level

PUT `/api/levels/:levelId`
- **Purpose:** Updates and returns a new level.
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** PUT
  - **URL:** `/api/levels/:levelId`
  - **Body:**
  ```json
  {
      "color": "#FFEA00",
      "deactivated": false,
      "id": 23,
      "name": "pain",
      "updatedAt": "2024-09-02T22:42:48.381Z",
      "userId": 4
  }
  ```

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**
  ```json
    {
      "color": "#FFEA00",
      "deactivated": false,
      "id": 23,
      "name": "pain",
      "updatedAt": "2024-09-02T22:42:48.381Z",
      "userId": 4
    }
  ```

### Delete an level

- **Purpose:** Deletes a level
- **Require Authentication:** true
- _Require proper authorization_
- **Request:**

  - **Method:** DELETE
  - **URL:** `/api/levels/:levelId`
  - **Body:** none

- **Successful Response:**

  - **Status Code:** 200
  - **Headers:**
    - Content-Type: application/json
  - **Body:**

    ```json
    {
      "message": "Successful"
    }
    ```
