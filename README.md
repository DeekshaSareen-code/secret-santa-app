# secret-santa-app

A fun Secret Santa app built with the MEAN stack (MongoDB, Express, Angular, Node.js). This app allows users to participate in a Secret Santa gift exchange by entering their details and receiving a match randomly assigned to them.

## Features:

- User registration (name, email, phone number)
- Random Secret Santa matching
- Email notifications with match details and Christmas quotes

## Getting Started:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up MongoDB.
4. Run the application using `npm start`.

## Technologies:

- MongoDB
- Express
- Angular
- Node.js
- Nodemailer (for email notifications)
- ChatGPT (for generating Christmas quotes)

## License:

This project is licensed under the MIT License.

## Project Structure

```
my-app/
│
├── backend/                    # Backend-related files (Node.js/Express)
│   ├── index.js                # Your main Express server file
│   ├── routes/                  # Express route handlers
│   ├── models/                  # Mongoose models for MongoDB
│   ├── controllers/             # Logic to handle requests
│   └── package.json             # Backend dependencies
│
├── frontend/                    # Frontend-related files (Angular)
│   ├── src/
│   ├── angular.json
│   └── package.json             # Frontend dependencies
│
└── README.md                    # Project documentation
```
