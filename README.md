# WebDevUserDatabase
A full-stack user management application using React, Node.js, Express, and a Postgres database (hosted on Render).

## Features
- View, add, edit, and delete users
- Search users by first or last name
- Sort users by any column (ascending/descending)
- All user data is stored on a Render Postgres database

## User Columns
- User ID
- First Name
- Last Name
- Email Address
- Age

## Prerequisites
- Node.js and npm installed

## Getting Started

### 1. Clone the repository
```powershell
git clone <repo-url>
cd WebDevUserDatabasePostgresDB
```

### 2. Set up the server
```powershell
cd server
npm install
```
- Create a `.env` file in the `server` folder with the following content:
```
POSTGRES_URI=postgresql://postgres_project_db_user:wuTzVGm1KH6FMUXsy6vmrvAZI5tENOAx@dpg-d2dq210dl3ps73b5a1fg-a.oregon-postgres.render.com/postgres_project_db
```

### 3. Start the server
```powershell
npm start
```
- The server will run on `http://localhost:5000`

### 4. Set up the client
```powershell
cd ../client
npm install
```

### 5. Start the client
```powershell
npm start
```
- The React app will run on `http://localhost:3000`

### Important: API URL for Local Development

By default, the frontend is set to use the deployed backend on Render:

```js
const API_URL = 'https://webdevuserdatabasepostgresdb.onrender.com/users';
```
to run it locally use this instead

```js
const API_URL = 'http://localhost:5000/users';
```

## Usage
- Open `http://localhost:3000` in your browser.
- Use the interface to manage users. All changes are saved to the Postgres database.