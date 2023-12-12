# EventZ Planner

EventZ Planner is a comprehensive event management website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a user-friendly platform for event organizers and attendees to manage and participate in events. The system includes features such as user authentication, event CRUD operations, booking functionality, and ticket generation with QR code verification.

## Features

- **User Authentication and Authorization**: Secure registration and login system for users. Different roles (organizer, attendee) with appropriate permissions are implemented.

- **Event Management**:
  - Create, read, update, and delete (CRUD) operations for events.
  - Add photos to events for a visually appealing experience.

- **Booking System**:
  - Users can browse available events and book tickets for the ones they are interested in.
  - Generate a unique ticket for each booking, including a QR code for easy verification.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Ticket Generation**: QR Code integration

## Getting Started

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/KruthikB/EventZ-Planner-Frontend.git
    cd EventZ-Planner-Frontend
    ```

2. **Setup Backend**:

    - Install dependencies:

        ```bash
        git clone https://github.com/KruthikB/EventZ-Planner-Backend.git
        cd EventZ-Planner-Backend
        npm install
        ```

    - Configure MongoDB connection in `backend/config/default.json`.

    - Run the backend server:

        ```bash
        npm start
        ```

3. **Setup Frontend**:

    - Install dependencies:

        ```bash
        cd frontend
        npm install
        ```

    - Run the frontend server:

        ```bash
        npm start
        ```

4. **Access the Application**:

    - Open your browser and go to `http://localhost:3000` to access the EventZ Planner application.

## Folder Structure

- **backend**: Contains server-side code.
- **frontend**: Contains client-side code.

## Additional Notes

- Ensure that MongoDB is installed and running on your machine.
- Customize the authentication and authorization logic based on your requirements.
- Use a file storage service (e.g., AWS S3) for storing uploaded photos in a production environment.

## Contributors

- List the contributors and their contributions here.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# Screenshots and Implementations

![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/7585a043-3fca-4447-884c-099810fb61ff)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/48432364-cb50-47db-a143-b17b203a4dd9)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/5d193fbe-7d76-448d-aedf-1bb9ad0c8d2d)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/d9e4580b-9cee-46df-9329-d11574c4b623)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/34bda210-750c-4ffd-bf02-e23ddd538202)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/8b9c9883-0799-4371-8f06-ee3f06e15110)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/e1dc61a8-8e66-4b57-a77b-9c6d2c8c9bbe)
![image](https://github.com/KruthikB/EventZ-Planner-Frontend/assets/112860541/5909f06f-fe0f-48d1-a253-f3278b0a0f37)








