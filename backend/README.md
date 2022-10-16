This is a Spring Boot application with a H2 database.

## Getting Started

First, run the server:

```bash
mvnw spring-boot:run
```

Server will be hosted at [http://localhost:8080](http://localhost:8080)

## Java

The Java files are located in the src/main/java/com/team7/campusdiscoveryservice/ directory. 

### Entity
The entity folder holds the data types/Objects held in each table. There is an example User class in the folder with more details.

### Repository
The resository folder holds the interface classes for the different repositories. It extends [JpaRepository](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html), and thus inherits its methods. There is an example UserRepository located in the folder.

### Controller
The controller folder holds REST controller classes. Tags are used to specifiy different requests.

Example: GET request http://localhost:8080/api/users/ will return a list of all users.

## Database

The database is stored in the demodb.mv.db file in the main folder. 

Any changes you make to the database will be persisted and saved in the files for the next time the application runs.

There is already a database with some data in the demodb.mv.db file, so the application can be used. To reset/initialize the database, add the SQL insert statements for your data in the /src/main/resources/data.sql file and add the below statement to the application.properties file in the same folder.

```bash
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=create
```
This will overwrite the database file each time you restart the server.


To get a better view of the database, there is a H2 Console located at [http://localhost:8080/h2-console](http://localhost:8080/h2-console). The password is currently set to 1.

You can edit the database in this console and make SQL queries. Any changes will be saved to the database file.

## More Help 
Some helpful links:

### React/REST
[React JS + Spring Boot REST API Example Tutorial](https://www.youtube.com/watch?v=5RA5NpxbioI)
[React.js and Spring Data REST](https://spring.io/guides/tutorials/react-and-spring-data-rest/)

### H2 Database
[Spring Boot With H2 Database](https://www.baeldung.com/spring-boot-h2-database)
[Integrating H2 Database with Spring Boot](https://stackabuse.com/integrating-h2-database-with-spring-boot/)



