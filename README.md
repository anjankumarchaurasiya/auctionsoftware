# Frontend - React Application

This is the frontend of the project, built using React, Ant Design for UI, and React Router for routing. The application provides a user interface to interact with the backend, including user login, logout, and protected routes for authenticated users.

## Features

- User authentication (login/logout)
- Project list( after login/signup )
- Protected routes for secure pages
- Integration with backend API for user data and authentication
- Ant Design UI components
- Form handling and validation using Ant Design
- Responsive UI

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14.x or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** (npm is included with Node.js)

## -------------------Frontend Installation---------------------------- ##
Frontend Setup

1. Clone the repository:

   ```bash
   git clone  https://github.com/anjankumarchaurasiya/auctionsoftware
   cd frontend
2. Install the dependencies:   
    npm install

3. Environment Setup  

    REACT_APP_API_URL=http://localhost:5000/api  # Update with your backend API URL in vite.config.ts -> target

4. Running the Application

    npm run dev     # run react app using vite    

Structure

frontend/
├── public/                  # Public assets
├── src/                     # React components and logic
│   ├── api/                 # API calls
│   ├── components/          # Reusable components
│   ├── context/             # AuthContext for authentication
│   └── App.tsx              # Main app component
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation


## -------------------Backend Installation---------------------------- ##
### Backend (`README.md`)
 
# Backend - Node.js API with Express & Sequelize

This is the backend of the project, built using Node.js with Express for the server and Sequelize for ORM (Object Relational Mapping). The backend provides APIs for user authentication and data management.

## Features

- User authentication (login/logout)
- Token-based authentication using JWT
- CRUD operations with mysql
- RESTful API architecture

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14.x or higher) - [Download Node.js](https://nodejs.org/)
- **MySQL/PostgreSQL/SQLite** (any SQL-compatible database)

## Installation

1. Clone the repository:

   git clone  https://github.com/anjankumarchaurasiya/auctionsoftware
   cd backend

2. Install the dependencies:

    npm install

3. Environment Setup

    # Server settings
    PORT=5000

    # Database settings (for Sequelize)
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=mydatabase
    DB_DIALECT=mysql  # Change to your database type (mysql, postgres, sqlite, etc.)

    # JWT secret
    JWT_SECRET=your_jwt_secret_key

5. Running the Application

    npm run dev