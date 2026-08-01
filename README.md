# Express.js + Mongoose + TypeScript REST API (CRUD Demo)

A clean, modern, and production-ready example of a **RESTful CRUD API** built using **Express.js**, **Mongoose (MongoDB)**, and **TypeScript**. 

This project demonstrates software engineering best practices, featuring a clean **multi-layered architecture** (Routes → Controllers → Services → Repositories → Models), strict type safety, standardized JSON responses, and centralized error handling.

---

## 📃 Framework & Tools

This project is built with the following core stack and tooling:

* **[Express.js](https://expressjs.com/)**: A fast, unopinionated, minimalist web framework for Node.js.
* **[Mongoose](https://mongoosejs.com/)**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
* **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript.
* **[tsx](https://github.com/privatenumber/tsx)**: Fast Node.js / TypeScript execute & watch runner for seamless local development.
* **[dotenv](https://github.com/motdotla/dotenv)**: Zero-dependency module that loads environment variables from a `.env` file.
* **[cors](https://github.com/expressjs/cors)**: Node.js package for enabling Cross-Origin Resource Sharing (CORS).

---

## 💡 Core Features

- Product Management: Create, retrieve, update, and delete products in the catalog.

- Product Search & Filtering: Search products by keyword, category, price range, and availability with pagination support.

- RESTful API: Adheres to REST principles with clear route definitions and proper HTTP status codes.

- Database Integration: Connects to a MongoDB database to store and retrieve product data efficiently.

---

## 🔧 How to Initialize

### Prerequisites

1. **Node.js**: Version 18.x or higher installed (`node -v`).
2. **MongoDB**: A running local MongoDB instance (`mongodb://localhost:27017`) or a cloud MongoDB Atlas connection URI.

### 1. Environment Setup

Copy the sample environment file to `.env`:

```bash
cp .env.example .env
```

Ensure `.env` contains your desired configuration:

```env
PORT=5002
MONGODB_URI=<your_mongo_db_connection_string>
NODE_ENV=development
```

### 2. Installation

Install all project dependencies:

```bash
npm install
```

---

## 📁 Project Structure

The project follows a **Multi-Layered Architecture** inspired by enterprise software design patterns:

```
demo-se-backend/
├── .env                  # Local environment configuration
├── .env.example          # Sample environment file
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies & npm scripts
├── tsconfig.json         # TypeScript compiler configuration
├── README.md             # Project documentation
└── src/
    ├── config/
    │   └── db.ts         # MongoDB database connection setup
    ├── controllers/
    │   └── productController.ts  # HTTP Request / Response handling layer
    ├── middlewares/
    │   ├── errorHandler.ts   # Centralized error handler middleware
    │   └── validateObjectId.ts # Mongo ObjectId validation middleware
    ├── models/
    │   └── productModel.ts   # Mongoose Schema & TypeScript Interface definitions
    ├── repositories/
    │   └── productRepository.ts # Data Access Layer (DAL) interacting with Mongoose
    ├── routes/
    │   └── productRoutes.ts  # Express REST API routes definitions
    ├── services/
    │   └── productService.ts  # Business logic & domain validation layer
    ├── utils/
    │   ├── apiResponse.ts    # Standardized JSON response formatter
    │   └── customError.ts    # Custom AppError class for operational errors
    ├── seeds/
    │   ├── mock-data.json    # Sample MongoDB dataset for import
    │   └── seed.ts           # Database seeding script
    └── index.ts              # Main Application Entrypoint & Express App setup
```

### Layer Breakdown

1. **Routes (`src/routes`)**: Defines HTTP methods and URL paths, binding them to controllers and validation middlewares.
2. **Controllers (`src/controllers`)**: Handles HTTP requests, extracts parameters/body, delegates logic to services, and sends standardized HTTP responses.
3. **Services (`src/services`)**: Contains pure business logic, input validation, and business rule enforcement.
4. **Repositories (`src/repositories`)**: Data Access Layer (DAL) that directly performs MongoDB queries via Mongoose models.
5. **Models (`src/models`)**: Defines Mongoose Schemas and TypeScript document interfaces.
6. **Middlewares (`src/middlewares`)**: Intercepts requests for error handling, authentication, or input validation.

---

## 🚀 How to Run

### Case 1: Development Mode (Hot-Reloading)

To run the application locally with automatic restarting on code changes:

```bash
npm run dev
```

The server will start at `http://localhost:5002`.

### Case 2: Build & Production Mode

1. **Compile TypeScript to JavaScript**:

```bash
npm run build
```

This generates compiled JavaScript code inside the `dist/` directory.

2. **Start the Production Server**:

```bash
npm start
```

### Case 3: Type Checking

To verify TypeScript types across the codebase without emitting JS files:

```bash
npm run typecheck
```

---

## 📥 Importing Mock Data to MongoDB

This repository includes a `src/seeds/mock-data.json` file containing sample product records.

### Option A: Using the built-in Seeding Script (Recommended)

Simply run the following command in your terminal to automatically connect and seed the database using the mock data:

```bash
npm run seed
```

### Option B: Using `mongoimport` (Command Line)

Run the following command in your terminal to import the mock data into your local MongoDB:

```bash
mongoimport --db product_db --collection products --file src/seeds/mock-data.json --jsonArray --drop
```

### Option C: Using MongoDB Compass (GUI)

1. Open **MongoDB Compass** and connect to your database (`mongodb://localhost:27017`).
2. Create or select database `product_db` and collection `products`.
3. Click **Add Data** -> **Import JSON or CSV file**.
4. Select `src/seeds/mock-data.json` from this project folder and click **Import**.

---

## 📡 API Endpoint Reference (CRUD)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Create a new product |
| `GET` | `/api/products` | Retrieve all products (supports search, category, & pagination) |
| `GET` | `/api/products/:id` | Retrieve a single product by ID |
| `PUT` | `/api/products/:id` | Update an existing product by ID |
| `DELETE` | `/api/products/:id` | Delete a product by ID |

---

## 🧪 Testing the API (cURL Examples)

### 1. Create a Product (`POST`)

```bash
curl -X POST http://localhost:5002/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smart Fitness Watch",
    "description": "Heart rate monitor with GPS and 7-day battery life.",
    "price": 149.99,
    "category": "Electronics",
    "inStock": true,
    "stockQuantity": 30,
    "tags": ["watch", "fitness", "gadget"]
  }'
```

### 2. Get All Products with Search & Pagination (`GET`)

```bash
curl -X GET "http://localhost:5002/api/products?search=wireless&page=1&limit=5"
```

### 3. Get Single Product by ID (`GET`)

```bash
curl -X GET http://localhost:5002/api/products/679c10000000000000000001
```

### 4. Update Product (`PUT`)

```bash
curl -X PUT http://localhost:5002/api/products/679c10000000000000000001 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 179.99,
    "stockQuantity": 50
  }'
```

### 5. Delete Product (`DELETE`)

```bash
curl -X DELETE http://localhost:5002/api/products/679c10000000000000000001
```
