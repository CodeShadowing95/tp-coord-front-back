# TP Front-Back

This project is a full-stack application consisting of an Angular frontend and a Spring Boot backend.

## Prerequisites

- Node.js & npm
- Java (JDK 17 or later recommended)
- Maven (optional, wrapper included)

## Project Structure

- `frontend-angular/`: The Angular frontend application.
- `demo 2/`: The Spring Boot backend application.

## How to Run

### 1. Backend (Spring Boot)

Navigate to the backend directory:

```bash
cd "demo 2"
```

Run the application using the Maven wrapper:

```bash
# On macOS/Linux
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```

The backend server will start on `http://localhost:9000`.
You can access the H2 console at `http://localhost:9000/h2-console`.

### 2. Frontend (Angular)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend-angular
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend application will be available at `http://localhost:4200`.

## Testing

### Frontend Tests

To run the unit tests for the frontend:

```bash
cd frontend-angular
npm test
```

To run Cypress end-to-end tests:

```bash
cd frontend-angular
npm run cy:open
```

## Features

- User authentication (Login/Register)
- Note management (Create, Read, Update, Delete)
- Admin capabilities
