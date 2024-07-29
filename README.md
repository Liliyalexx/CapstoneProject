# TechHer Blog

TechHer Blog is a full-stack application designed to empower women by providing a platform to find jobs in tech, change careers to tech, and post job openings. This project leverages modern web technologies including React, Redux Toolkit, Firebase, Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Redux Integration](#redux-integration)
- [Firebase Integration](#firebase-integration)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)



## Features

- User authentication with email/password and Google.
- Theme toggle between light and dark mode.
- Responsive design using Tailwind CSS and Flowbite React components.
- Protected routes for user-specific pages.
- Role-based access control for admin functionalities.
- Redux for state management with persistence.
- Firebase for authentication.
- REST API built with Express and MongoDB.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/techher-blog.git
   cd techher-blog/frontend
Install dependencies:


npm install
# or
yarn install
Create a .env file in the frontend directory with the following content:


VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
Start the development server:


npm run dev
# or
yarn dev
Backend
Navigate to the backend directory:


cd techher-blog/backend
Install dependencies:


npm install
# or
yarn install
Create a .env file in the backend directory with the following content:


MONGO='YOUR_MONGO_URI'
JWT_SECRET='YOUR_JWT_SECRET'
Start the development server:


npm run dev
# or
yarn dev
## Usage

- Visit [http://localhost:3000](http://localhost:3000) to access the frontend.
- The backend server runs on [http://localhost:3002](http://localhost:3002).

## Folder Structure

```plaintext
.
├── blog_client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   │   ├── theme
│   │   │   └── user
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── firebase.js
│   ├── .env
│   ├── package.json
│   └── vite.config.js
└── app
    ├── controllers
    ├── models
    ├── routes
    ├── utils
    ├── index.js
Redux Integration
Theme Slice
src/redux/theme/themeSlice.js:

javascript
Copy code
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
User Slice
src/redux/user/userSlice.js:

javascript
Copy code
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
Store Configuration
src/redux/store.js:

javascript
Copy code
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
Firebase Integration
src/firebase.js:

javascript
Copy code
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'techherblog.firebaseapp.com',
  projectId: 'techherblog',
  storageBucket: 'techherblog.appspot.com',
  messagingSenderId: '264773397883',
  appId: '1:264773397883:web:17a4a72abd94a5515121de',
};

console.log('Firebase Config:', firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
API Endpoints
The backend API endpoints are structured as follows:

POST /api/auth/signup - User signup.
POST /api/auth/signin - User signin.
GET /api/posts - Get all posts.
POST /api/posts - Create a new post.
GET /api/posts/:id - Get a single post by ID.
PUT /api/posts/:id - Update a post by ID.
DELETE /api/posts/:id - Delete a post by ID.
Environment Variables
Frontend
Create a .env file in the frontend directory with the following content:

env
Copy code
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
Backend
Create a .env file in the backend directory with the following content:

env
Copy code
MONGO='YOUR_MONGO_URI'
JWT_SECRET='YOUR_JWT_SECRET'
Technologies Used
React
Redux Toolkit
Firebase
Tailwind CSS
Flowbite React
Node.js
Express
MongoDB
JWT for authentication