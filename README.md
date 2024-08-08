# THIS IS REQRUITMENT TASK FOR CODEJET COMPANY

# Sensor Data Processing

This project is a backend application that processes sensor data using WebSockets, stores the data in a MongoDB database.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running the Tests](#running-the-tests)
- [Usage](#usage)
- [Architecture](#architecture)
- [Database Schema](#database-schema)

## Introduction
The Sensor Data Processing project is a backend application that receives sensor data (temperature and humidity) via WebSockets, validates the data, and stores it in a MongoDB database. The application is built using NestJS.

## Features
- Receive sensor data via WebSockets
- Validate incoming sensor data
- Store sensor data in a MongoDB database
- Provide a WebSocket gateway for easy integration with external systems
- Unit tests for the main components of the application

## Technologies Used
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [WebSockets](https://socket.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Jest](https://jestjs.io/)

## Project Structure
The project have following structure:

```
src/
├── api/
│   ├── gateways/
│   │   └── sensor-data.gateway.ts
│   └── api.module.ts
├── application/
│   ├── services/
│   │   └── sensor-data.service.ts
│   └── application.module.ts
├── database/
│   ├── repositories/
│   │   └── sensor-data.repository.ts
│   ├── schemas/
│   │   └── sensor-data.schema.ts
│   └── database.module.ts
├── main.ts
└── app.module.ts
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Installation
1. Clone the repository:<br>
   HTTP: 
   ```
   git clone https://github.com/your-username/sensor-data-processing.git -b develop
   ```
   SSH:
   ```
   git clone git@github.com:Iicytower/codejet-recruitment-task.git -b develop
   ```
2. Navigate to the project directory:
   ```
   cd codejet-recruitment-task
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Copy `.env.example` file
   ```
   cp .env.example .env
   ```

### Running the Application
1. Start the development environment using Docker Compose:
   ```
   docker compose up
   ```
   This will start the NestJS application and the MongoDB database in separate containers.

2. The application will be accessible at `localhost:3000`.

### Running the Tests
To run the unit tests, use the following command:
```
npm run test
```
This will execute the Jest-based unit tests and provide the test results.

## Usage
The application exposes a WebSocket gateway at the `/sensorData` endpoint. Clients can connect to this endpoint and send sensor data in the following format:

```json
{
  "temperature": 25, // temperature in degrees Celsius
  "humidity": 50 // humidity in percent
}
```

The application will validate the incoming data and store it in the MongoDB database.

## Architecture
The main components are:
- **API**: The WebSocket gateway that handles incoming sensor data.
- **Application**: The service that processes the sensor data and interacts with the database.
- **Database**: The MongoDB repository that handles the storage and retrieval of sensor data.

Every main component is separate layer. 
  * api layer can use application layer but doesn't know about the existence of database layer.
  * application layer can use database but do not know anything about api layer.
  * database layer doesn't know anything about existence of application and api layers.

## Database Schema
The sensor data is stored in a MongoDB collection using the following schema:

```typescript
export interface SensorData extends Document {
  temperature: number;
  humidity: number;
}
```
