# User-authentication-system

## Description
This project is a User-Authentication System that allows users to register the profile. The system is built with a frontend using HTML, CSS, and JavaScript, and a backend using Java, Spring Boot, and MySQL.

## Features
- Submit form with validation for name, email, and password.
- Delete profile entries.

## Technologies Used

### Frontend:
- HTML
- CSS (Bootstrap for styling)
- JavaScript

### Backend:
- Java (Spring Boot Framework)
- MySQL Database

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Java Development Kit (JDK) 8 or higher
- MySQL Server
- Apache Maven
- Apache Tomcat Server
- An IDE such as Eclipse or IntelliJ IDEA

## Local Setup
Follow these steps to set up the project locally:

1. Clone the Repository:
   - Open your terminal or command prompt.
   - Clone this repository using the following command:
     ```bash
     git clone  https://github.com/BlackPearl117/User-authentication-system.git
     ```
     
2. Navigate to the Project Directory:
   - Change your working directory to the project folder:
     bash
     cd User-Authentication
     
3. Set Up the Database:
   - Start your MySQL server
   - Log in to MySQL and create the required database
    bash
      CREATE DATABASE auth_db;
    

4. Open the Project in Eclipse or IntelliJ IDEA:
   - For Eclipse:
      - 1. Open Eclipse.
      - 2. Click on File > Import > Existing Maven Projects.
      - 3. Browse to the project directory and select it.
      - 4. Click Finish to load the project.
   
   - For IntelliJ IDEA:
      - 1. Open IntelliJ IDEA.
      - 2. Click on Open and select the project directory.
      - 3. IntelliJ will automatically detect the Maven project and import it.
   
 5. Update the application.properties file in the src/main/resources directory with your MySQL credentials::

         spring.datasource.url=jdbc:mysql://localhost:3306/auth_db  
         spring.datasource.username=<your-username>  
         spring.datasource.password=<your-password>
    
6. Run the application:
   - For Eclipse: Navigate to the src/main/java/com.colon.feedback/AuthModuleApplication.java, right-click > Run As > Java Application.
   - For IntelliJ IDEA: Navigate to the AuthModuleApplication class, right-click > Run 'AuthModuleApplication'.
   - The backend server will start at http://localhost:8080

7. Set Up the Frontend:
   - Ensure the script.js file and other frontend files are located in the src/main/resources/static directory.
   - Access the frontend in your browser at http://localhost:8080
   
8. Test the Features:
   - Open the application in your browser.
   - Submit the form, view the profile, and delete entries to ensure everything works as expected.
