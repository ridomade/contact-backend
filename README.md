# Contact Management API

This is a **Node.js Express-based REST API** for managing contacts. The API allows users to **create, read, update, and delete (CRUD)** contacts while implementing user authentication.

## Features

-   **User Authentication** (JWT-based)
-   **CRUD Operations** for managing contacts
-   **MongoDB Database Integration** (via Mongoose)
-   **Error Handling Middleware** for better API responses
-   **Environment Variables Support** via `.env` file

## Prerequisites

Ensure you have the following installed:

-   **Node.js** (v16 or later recommended)
-   **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
-   **npm** (Node Package Manager)

## Installation

1. Clone this repository:

    ```sh
    git clone https://github.com/ridomade/contact-backend.git
    ```

2. Navigate into the project directory:

    ```sh
    cd contact-management
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and configure the required environment variables:

    ```sh
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

5. Start the development server:

    ```sh
    npm run dev
    ```

6. Alternatively, for production mode:
    ```sh
    npm start
    ```

## API Endpoints

### User Authentication (`/api/users`)

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| `POST` | `/register` | Register a new user           |
| `POST` | `/login`    | Authenticate user & get token |
| `GET`  | `/profile`  | Get user profile (Protected)  |

### Contact Management (`/api/contact`)

| Method   | Endpoint | Description                |
| -------- | -------- | -------------------------- |
| `GET`    | `/`      | Get all contacts           |
| `POST`   | `/`      | Create a new contact       |
| `GET`    | `/:id`   | Get a single contact by ID |
| `PUT`    | `/:id`   | Update an existing contact |
| `DELETE` | `/:id`   | Delete a contact           |

## Project Structure

```
ContactManagement/
│-- config/          # Database connection & config settings
│-- middleware/      # Middleware functions (e.g., error handling, authentication)
│-- models/         # Mongoose models (User, Contact)
│-- routes/         # Express routes (contactRoutes, userRoutes)
│-- controllers/    # Business logic for handling requests
│-- server.js       # Main server entry point
│-- package.json    # Project dependencies & metadata
│-- .env            # Environment variables (not committed to Git)
```

Made with ❤️ by Made Rido Paramartha
