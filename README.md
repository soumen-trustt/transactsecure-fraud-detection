# TransactionSecure Fraud Detection Platform

🚀 A modern web application built with Spring Boot (Java) and React that provides real-time fraud detection for financial transactions. The platform features secure user authentication, transaction management, fraud alerting, and a responsive, interactive dashboard UI.

## Features

✔️ User authentication (signup, login, logout)
✔️ JWT-secured REST API
✔️ Transaction creation and browsing
✔️ Fraud detection and alerting
✔️ Real-time dashboard with React UI
✔️ Responsive design for all devices
✔️ Secure session and data management

### Core Features

1️⃣ **User Authentication**
   - Secure signup and login functionality (JWT-based)
   - Session management for logged-in users
   - Protected routes in the UI

2️⃣ **Transaction & Fraud Management**
   - Submit new transactions
   - Browse all transactions
   - Fraud detection with alerting (backend logic)
   - View fraud alerts in the dashboard

3️⃣ **User Experience**
   - Responsive React-based dashboard
   - Intuitive navigation with tabs
   - Dynamic UI based on authentication status
   - Modern Material UI styling

## Installation & Running Locally

### Prerequisites
- Java 17+
- Node.js 18+ (recommended)
- npm (comes with Node.js)
- Git installed

### Clone the Repository and Run the Application

```bash
git clone https://github.com/yourusername/transactsecure-fraud-detection.git
cd transactsecure-fraud-detection

# Start the backend (Spring Boot)
./gradlew bootRun

# In a separate terminal, start the React UI
cd ui
npm install
npm start
```

- The backend will run on http://localhost:8080
- The React UI will run on http://localhost:3000 (proxying API requests to the backend)

## Project Structure

```
transactsecure-fraud-detection/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── soumen/
│   │   │           └── transactsecure/
│   │   │               ├── controller/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               ├── service/
│   │   │               ├── security/
│   │   │               ├── config/
│   │   │               └── FraudDetectionApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/
│   └── test/
├── ui/ (React frontend)
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── build.gradle
├── settings.gradle
└── README.md
```

## Technologies Used

- **Backend**: Spring Boot, Spring Security, Spring Data JPA, Kafka (for event streaming)
- **Frontend**: React, Material UI, Axios
- **Database**: YugabyteDB (or any compatible SQL DB)
- **Build Tool**: Gradle

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Name - Soumen Manna

Email - mail2soumen007@gmail.com

Project Link: [https://github.com/soumenprogramming/transactsecure-fraud-detection](https://github.com/soumenprogramming/transactsecure-fraud-detection)
