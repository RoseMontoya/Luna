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
