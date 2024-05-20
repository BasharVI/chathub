# ChatHub

**ChatHub** is a real-time chat application that enables users to join and create public groups for seamless communication. Features include instant messaging, group browsing, and message history loading. Built with Node.js, Express, MongoDB, and React for an interactive chat experience.

## Features

- User Authentication (Register/Login)
- Create and Join Public Groups
- Real-time Messaging with Socket.io
- Browse Available Groups
- Load Older Messages on Scroll

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chathub.git
   cd chathub
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following variables:

   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Start the frontend server:

   ```bash
   cd ../frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License.
