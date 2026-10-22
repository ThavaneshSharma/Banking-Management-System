# IOBANK – International Operations Banking Platform

IOBANK is a full-stack digital banking application designed to simplify financial management through a centralized platform supporting multiple currency accounts. The system enables users to manage accounts, perform credit and debit operations, transfer funds, convert currencies, and track transaction histories through an intuitive user interface.

## Key Features

- **Multi-Currency Account Management:** Create and manage accounts in different currencies under a single user profile.
- **Fund Transfers:** Perform account transfers with balance updates and transaction record maintenance.
- **Currency Conversion:** Support currency conversion using available exchange-rate data.
- **Credit Card Management:** Create and manage credit cards and maintain transaction records.
- **Secure Authentication:** Implement user authentication and request authorization using Spring Security and JWT.
- **Transaction Tracking:** Maintain transaction histories for improved transparency and monitoring.
- **Centralized Dashboard:** Provide a unified interface for accessing and managing banking operations.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Java, Spring Boot, Spring Web (REST APIs)
- **Database:** PostgreSQL
- **Data Access:** Spring Data JPA, Hibernate
- **Security:** Spring Security, JWT
- **Development Tools:** IntelliJ IDEA, Visual Studio Code, Postman

## Architecture

The React.js frontend communicates with the Spring Boot backend through REST APIs. Spring Security and JWT protect authenticated endpoints, while Spring Data JPA and Hibernate handle database operations with PostgreSQL.

## Future Enhancements

Potential improvements include mobile banking support, international payment gateway integration, fraud detection, and detailed financial reporting.

**Note:** IOBANK is an academic software project that demonstrates digital banking workflows. It is not a production banking system.
