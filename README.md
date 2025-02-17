# cheatty-slot-machine
Full Stack implementation of a configurable slot machine that (eventually) will take your money.
# Cheatty Slot Machine

This is the backend API for the Cheatty Slot Machine application. It provides endpoints for user authentication, session management, and slot machine gameplay.

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the API](#running-the-api)
- [Serving Static Files](#serving-static-files)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Sessions](#sessions)
- [Entities](#entities)
  - [User](#user)
  - [Session](#session)
- [In-Memory Database](#in-memory-database)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cheatty-slot-machine.git
   cd cheatty-slot-machine/backend
   ```

## Environment Setup
Create .env files for local development and production environments - you can use `.env.example` as reference.
For local development create `env.development.local` and for production `env.production.local`. The only environment variable controlled from "outside" is NODE_ENV.

On the backend there is addional configuration file - `config/slotMachine.js` which controls the behavior and looks of the slot machine.

## Running The Cheatty Slot Machine Application
#### Running Locally
To run locally, for the backend - simply run `npm run dev`, for the frontend execute `npm run dev` as well, then open your browser and got to `http://localhost:5173`

#### Running On Production
For the backend - execute `npm run start`, for the frontend - build the static files by executing `npm run buiild`. The bundled output files should be served to a browser in any way you prefer - for more details read below.

#### Serving Static Files
The build files of the frontend can be served by the express app. If you do - you will need to copy the build files into `/backend/public` folder (create the folder if it does not exist) - if you selected this option then the frontend app can be accessed via `/app` endpoint i.e. `http://localhost:5500/app`.

if the frontend build files are hosted from another domain - make sure to include this domain in the approved domains list of the CORS middleware.

#### Running Tests
The backend contains test suite, in order to run it execute `npm run test`

#### API Documentation

#### Authentication
##### Signup
Endpoint: `POST /api/v1/auth/signup`
Description: Creates a new user and returns a JWT token.
Request Body: `{}`
Response:
```
{
  "success": true,
  "message": "new user created successfully",
  "data": {
    "user": {
      "id": "number",
      "credit": "number"
    },
    "token": "string"
  }
}
```

#### Users
##### Get User
Endpoint: `GET /api/v1/users/:id`
Description: Retrieves a user by ID.
Response:
```
{
  "id": "number",
  "credit": "number"
}
```

##### Update User
Endpoint: `PUT /api/v1/users/:id`
Description: Updates a user's information.
Request Body:
```
{
  "id": "number",
  "credit": "number"
}
```

#### Sessions
##### Create Session
Endpoint: `POST /api/v1/sessions`
Description: Creates a new session.
Response:
```
{
  "session": {
    "id": "number",
    "createdAt": "string",
    "credit": "number",
    "userId": "number"
  },
  "symbols": ["string"]
}
```

##### Get Session
Endpoint: `GET /api/v1/sessions/:id`
Description: Retrieves a session by ID.
Response:
```
{
  "id": "number",
  "createdAt": "string",
  "credit": "number",
  "userId": "number"
}
```

##### Play Session
Endpoint: `GET /api/v1/sessions/play/:id`
Description: Plays a session and returns the results.
Response:
```
{
  "id": "number",
  "createdAt": "string",
  "credit": "number",
  "userId": "number",
  "results": ["string"]
}
```

##### Cashout Session
Endpoint: `POST /api/v1/sessions/cashout/:id`
Description: Cashes out a session and updates the user's credit.
Response:
```
{
  "success": true,
  "message": "Session cashed out successfully",
  "user": {
    "id": "number",
    "credit": "number"
  },
  "session": {
    "id": "number",
    "createdAt": "string",
    "credit": "number",
    "userId": "number"
  }
}
```

### Entities

#### User
A User represents a player in the slot machine game. Each user has the following properties:

`id`: Unique identifier for the user.
`credit`: The amount of credit the user has.

#### Session
A Session represents a game session for a user. Each session has the following properties:

`id`: Unique identifier for the session.
`createdAt`: Timestamp of when the session was created.
`credit`: The amount of credit available in the session.
`userId`: The ID of the user who owns the session.


### Relationships
A User can have multiple Sessions.
Each Session belongs to a single User.

### In-Memory Database
For simplicity, this project uses an in-memory database implemented as a JavaScript object. This means that all data is lost when the server is restarted. This approach is suitable for development and testing purposes but should be replaced with a persistent database for production use.