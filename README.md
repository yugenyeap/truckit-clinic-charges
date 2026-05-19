# Clinic Charges App

A full-stack clinic charges management application built with:

- FastAPI
- PostgreSQL
- Angular
- AG Grid
- Docker Compose

The application supports:

- Infinite scrolling
- Server-side pagination
- Server-side sorting
- Server-side filtering
- Inline editing
- Creating new charges

---

# Running the Application

## Prerequisites

Install and run:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)


## Clone the Repository

```bash
git clone https://github.com/yourusername/truckit.git
cd truckit
```

## Start the Full Stack Application

From the project root directory:

```bash
docker compose up --build
```

---

# Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

## Frontend
- Angular
- AG Grid Community

## Infrastructure
- Docker
- Docker Compose

---

# Features

## Grid Functionality
- Infinite Row Model
- Server-side pagination
- Server-side sorting
- Server-side filtering

## Filtering
- `Medical Centre Name` supports text contains filtering
- `Charge Type` supports text contains filtering

## Editing
- Inline editing with automatic PATCH updates

## Creating Charges
- Form to create new clinic charge records

---

# Application URLs

## Frontend
http://localhost:4200

## Backend API
http://localhost:8000

## Swagger API Docs
http://localhost:8000/docs

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/charges` | Paginated list of charges |
| POST | `/charges` | Create a new charge |
| PATCH | `/charges/{id}` | Update an existing charge |

---

# Pagination

The backend supports server-side pagination using:

- `startRow`
- `endRow`

The API also returns:
- total row count

for AG Grid Infinite Row Model support.

---

# Project Structure

```text
/backend
/frontend
docker-compose.yml
README.md
```

---

# Notes

- The database is automatically seeded on startup
- AG Grid Community edition was used
- Docker Compose orchestrates the frontend, backend, and database services

---

# Future Improvements

- Authentication
- Unit tests
- End-to-end tests
- Production deployment configuration
- Optimistic UI updates
- Front-end/ Client side input validation