# secret-santa-app

A fun Secret Santa app built with the MEAN stack (MongoDB, Express, Angular, Node.js). This app allows users to participate in a Secret Santa gift exchange by entering their name and receiving a match randomly assigned to them.

## Features:

- User name registration
- Random Secret Santa matching

## Getting Started:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up MongoDB.
4. Run the application using `npm start`.

## Technologies:

- SQL
- Express
- Angular
- Node.js
- ChatGPT (for generating Christmas quotes) : TBD

## License:

This project is licensed under the MIT License.

## Project Structure

```
secret-santa-app/
│
├── backend/                           # Backend-related files (NestJS)
│   ├── src/                            # Source code for backend
│   │   ├── app.module.ts               # Root module
│   │   ├── secret-santa/               # Secret Santa feature module
│   │   │   ├── secret-santa.module.ts  # Module to encapsulate Secret Santa logic
│   │   │   ├── dto/                    # Data Transfer Objects (validation for requests)
│   │   │   ├── controllers/            # Route handlers for secret santa-related requests
│   │   │   ├── services/               # Business logic for creating pairs, etc.
│   │   │   ├── repository/             # Database interactions and queries
│   │   │   └── db/                     # DB-related services (MySQL connection management)
│   │   └── main.ts                     # Entry point for the app (NestJS app bootstrapping)
│   ├── .env                            # Environment variables (e.g., DB credentials)
│   ├── package.json                    # Backend dependencies and scripts
│   ├── tsconfig.json                   # TypeScript configuration
│
├── frontend/                           # Frontend-related files (Angular)
│   ├── src/                            # Source code for the frontend
│   │   ├── app.module.ts               # Root module
│   │   ├── app/                        # Secret Santa feature module
│   │   │   ├── add-names               # Add names component
│   │   │   ├── start                   # Initialize component
│   │   │   ├── view-partipant          # View participant component
│   │   │   ├── api.service.ts          # Business logic for calling BE services
│   │   │   ├── app.routing.module.ts   # Endpoint routing module
│   │   │   └── app.component.ts        # Start component
│   │   └── main.ts                     # Entry point for the app (NestJS app bootstrapping)
│   ├── angular.json                    # Angular-specific configuration
│   ├── package.json                    # Frontend dependencies
│   └── README.md                       # Frontend documentation
│
└── README.md                           # Main project documentation (overview of both frontend and backend)
```
