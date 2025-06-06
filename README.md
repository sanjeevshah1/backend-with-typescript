# Backend with TypeScript

A robust, scalable, and efficient REST API backend built with **TypeScript**, **Express**, and **MongoDB**. This project is designed with modern practices, including session handling, structured logging, and API documentation using Swagger.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- **TypeScript** for type safety and cleaner code.
- **Session handling** using secure techniques.
- **Authentication & Authorization** with JSON Web Tokens (JWT) and bcrypt for password hashing.
- **Configuration management** with the `config` package.
- **MongoDB integration** using Mongoose for schema modeling.
- **Logging** with `pino` for efficient and structured logs.
- **Performance monitoring** with Prometheus and `prom-client`.
- **Input validation** with Zod for runtime validation.
- **Secure CORS handling**.
- **Environment variable management** with dotenv.

---

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Logging**: Pino

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/backend-with-typescript.git
   cd backend-with-typescript
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the API at `http://localhost:3000` (default).

---

## Scripts

- `npm run dev`: Start the development server with hot-reloading.
- `npm run build`: Compile the TypeScript code into JavaScript.

---

## Folder Structure

```plaintext
src
├── app.ts                # Entry point of the application
├── config                # Configuration files
├── controllers           # Route handlers
├── middlewares           # Custom middleware (e.g., session handling)
├── models                # Mongoose schemas/models
├── routes                # API route definitions
├── services              # Business logic and database interactions
├── utils                 # Utility functions (e.g., logger)
└── validations           # Zod validation shemas
```

---

### Adding New Endpoints

1. Define your route in the `routes` folder.
2. Implement the route handler in the `controllers` folder.

---

## Key Packages

| Package             | Purpose                                   |
|---------------------|-------------------------------------------|
| `express`           | Web framework                            |
| `mongoose`          | MongoDB integration                      |
| `jsonwebtoken`      | Token-based authentication               |
| `bcrypt`            | Password hashing                         |
| `zod`               | Input validation                         |
| `pino`              | Logging                                  |
| `dotenv`            | Environment variable management          |

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

### Author

Created by **Sanjeev Shah**.
