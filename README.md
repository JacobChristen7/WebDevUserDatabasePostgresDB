# WebDevUserDatabase

A full-stack user management application using React, Node.js, Express, and MongoDB Atlas.

## Features
- View, add, edit, and delete users
- Search users by first or last name
- Sort users by any column (ascending/descending)
- All user data is stored in MongoDB Atlas

## User Columns
- User ID
- First Name
- Last Name
- Email Address
- Age

## Prerequisites
- Node.js and npm installed
- MongoDB Atlas account

## Getting Started

### 1. Clone the repository
```
git clone <repo-url>
cd WebDevUserDatabase
```

### 2. Set up the server
```
cd server
npm install
```
- Create a `.env` file in the `server` folder with the following content:
```
MONGODB_URI=your-mongodb-atlas-uri
PORT=5000
```

### 3. Start the server
```
npm start
```
- The server will run on `http://localhost:5000`

### 4. Set up the client
```
cd ../client
npm install
```

### 5. Start the client
```
npm start
```
- The React app will run on `http://localhost:3000`

## Usage
- Open `http://localhost:3000` in your browser.
- Use the interface to manage users. All changes are saved to MongoDB Atlas.