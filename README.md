# healthcare-wellness-and-preventive-care-portal-team-rocket
**Name Member 1 -Aryan Meena** 
**Name Member 2 -Ashish Patodiya**
**Name Member 2 -Taha Ashraf Ansari**
This project focuses on an MVP implementation of a **Healthcare Wellness &
Preventive Care Web Portal** built as part of a hackathon challenge. The
platform enables patients to manage wellness goals and preventive
reminders while allowing healthcare providers to monitor patient
compliance.

------------------------------------------------------------------------
## System Flow Diagram
                          +----------------------+
                          |      Patient UI      |
                          |   (React / Vite)     |
                          +----------+-----------+
                                     |
                                     | 1. Login / Register
                                     v
                          +----------------------------+
                          |        Frontend App        |
                          |   Axios → REST Requests    |
                          +-------------+--------------+
                                        |
                                        | 2. API Call (/auth, /goals, /reminders)
                                        v
                          +----------------------------+
                          |       FastAPI Backend      |
                          |   Auth, Validation, RBAC   |
                          +------+------+--------------+
                                 |      |
                                 |      | 3. Provider requests dashboard data
                                 |      v
                                 |   +-----------------------+
                                 |   |   Provider Interface  |
                                 |   |  (Assigned Patients)  |
                                 |   +-----------------------+
                                 |
                                 | 4. CRUD Operations
                                 v
                       +-------------------------------+
                       |         MongoDB Atlas         |
                       | User, Goals, Reminders, Logs  |
                       +-------------------------------+


## Tech Stack

### Frontend

-   React (Vite)
-   Axios
-   React Router
-   CSS Modules

### Backend

-   FastAPI (Python)
-   JWT Authentication
-   Pydantic
-   Passlib (bcrypt)

### Database

-   MongoDB Atlas

### Deployment

-   Frontend: Vercel
-   Backend: Render

### DevOps

-   GitHub
-   GitHub Actions (CI/CD)

------------------------------------------------------------------------

## Features

### Patient

-   Secure authentication
-   Medical profile management
-   Daily wellness goal tracking
-   Preventive care reminders
-   Health tip of the day

### Provider

-   View assigned patients
-   Monitor compliance & activity

### Public

-   Public health information pages

### Security

-   JWT authentication
-   Password hashing (bcrypt)
-   Role-based access control
-   Consent tracking
-   Audit logging

------------------------------------------------------------------------

## Project Structure

    /repo-root
      /frontend
      /backend
      /infra
      README.md
      .env.example

------------------------------------------------------------------------

## Environment Variables

Stored in a `.env` file in `/backend` using the following format:

    MONGO_URI=
    JWT_SECRET=
    JWT_ALGORITHM=HS256
    JWT_EXPIRE_MINUTES=1440
    FRONTEND_URL=http://localhost:5173

------------------------------------------------------------------------

## Local Setup

### 1. Clone the Repository

``` bash
git clone https://github.com/aryan91111/healthcare-wellness-and-preventive-care-portal-team-rocket.git
cd healthcare-wellness-and-preventive-care-portal-team-rocket
git checkout develop
```

------------------------------------------------------------------------

### 2. Backend Setup

``` bash
cd backend
python -m venv .venv
source .venv\Scripts\activate
pip install fastapi uvicorn motor pydantic pyjwt passlib[bcrypt] python-dotenv
uvicorn main:app --reload
```

Locally, Backend runs at:

    http://localhost:8000

------------------------------------------------------------------------

### 3. Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

Locally, Frontend runs at:

    http://localhost:5173

------------------------------------------------------------------------

## API Overview

### Auth

-   POST `/api/auth/register`
-   POST `/api/auth/login`

### User

-   GET `/api/users/me`
-   PUT `/api/users/me`

### Goals

-   GET `/api/goals`
-   POST `/api/goals`

### Reminders

-   GET `/api/reminders`
-   POST `/api/reminders`

### Provider

-   GET `/api/provider/patients`
-   GET `/api/provider/patients/{id}`

### Public

-   GET `/api/public/{slug}`

------------------------------------------------------------------------

## CI/CD

-   Push to `develop` → Runs tests & linting
-   Push to `main` → Triggers production deployment
-   Secrets stored using GitHub Secrets

------------------------------------------------------------------------

## Security Notes

-   Passwords are securely hashed using bcrypt
-   JWT tokens have expiration
-   HTTPS enforced in production deployments
-   Medical data access is logged
-   Consent is mandatory during registration

------------------------------------------------------------------------

## Deployment Links

(Will be updated towards the end of the hackathon)

-   Frontend:
-   Backend:
