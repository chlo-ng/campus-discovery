This is a Spring Boot application with a H2 database.

# Getting Started

First, run the server:

For Windows:

```bash
mvnw spring-boot:run
```

For Mac:

```bash
./mvnw spring-boot:run
```

Server will be hosted at [http://localhost:8080](http://localhost:8080)

# REST APIs
Access at: http://localhost:8080/api/

## Users http://localhost:8080/api/users/
User Objects: 
id, username, password, role (STUDENT, TEACHER, or ALUMNI) , rsvp (Set), createdEvents (Set<Event>), invited (Set<Event>)

Run the backend server and go to the link to test if there are User objects.

{id}: replace with the id you want

### GET
**GET:** returns list of user objects

**GET('/{id}'):** returns user object with specified id

### POST
**POST:** pass in json body with username, password, and role to create new user

  **POST('users/login/'):** pass in json body with username, password to login, will return an error if invalid credentials

### PUT
**PUT('/{id}'):** pass in json body with username, password, and role to update user with specified id

### DELETE
**DELETE('/{id}'):** removes user with specified id from the database, including from rsvped, as well as events they created

## Events http://localhost:8080/api/events/
Event Objects: 
id, title, date (MUST BE IN MM-DD-YYYY format), startTime (MUST BE IN hh:mm:ss format), description, inviteOnly (default false), image (image url; defaults to gtLogo.png), creator (User), rsvped (Set<RSVP>), invites (Set<Users>)

Run the backend server and go to the link to test if there are Events objects.

{id}: replace with the id/values you want

### GET
**GET:** returns list of event objects

**GET('/{id}'):** returns event object with specified id

### POST
**POST('/{creatorID}'}:** pass in json body with title, date, startTime, location, description, inviteOnly (default will be false) and image (if nothing passed in then default) with creatorID in path variable to create new event

**POST('events/{eventID}/{userID}'):** pass in eventID and userID as path variables to create new invite
 


### PUT
**PUT('/{id}/{creatorID}'):** pass in json body with title, date, startTime, location, description, and image (if nothing passed in then default) with creatorID in path variable to update event with specified id


#### Request Parameter --> add ?parameter=value to the end of the request

**PUT('events/{id}/title'):** add request parameter title (ex. events/1/title?title= insert title here)

**PUT('events/{id}/description'):** add request parameter description to update for event with id (ex. events/1/title?descriptione= insert description here)

**PUT('events/{id}/date'):** add request parameter date to update for event with id (ex. events/1/date?date= insert date here in yyyymmdd format)

**PUT('events/{id}/starttime'):** add request parameter startTime to update for event with id (ex. events/1/starttime?startTime= insert time here in hh:mm:ss format)

**PUT('events/{id}/location'):** add request parameter location to update for event with id (ex. events/1/location?location= insert location here)

**PUT('events/{id}/image'):** add request parameter image to update for event with id (ex. events/1/image?image= insert image url here)

### DELETE
**DELETE('/{id}'):** removes event with specified id from the database, as well as from rsvp

**DELETE('events/{eventID}/{userID}'):** removes the invite for user with userID to event with eventID
  
## RSVP http://localhost:8080/api/rsvp/
  
RSVP objects have a composite key called pk = (Long userId, Long eventID) and an enum type RsvpValue (YES, MAYBE, NO)
 
### GET
 **GET('{eventID}'):** gets the basic user information (id, username, role_ for users what have rsvped to the event

### POST
**POST('{eventID}/{userID}/{rsvpValue}'):** creates new RSVP with rsvpValue for user with userID for event with eventID

### PUT
**PUT('{eventID}/{userID}/{rsvpValue}'):** updates the RSVP for user with userID for event with eventID to the passed in rsvpValue
 
### DELETE
**DELETE('{eventID}/{userID}/'):** deletes RSVP for user with userID for event with eventID

# Java

The Java files are located in the src/main/java/com/team7/campusdiscoveryservice/ directory. 

## Entity
The entity folder holds the data types/Objects held in each table and additional objects as needed.

## Repository
The resository folder holds the interface classes for the different repositories. It extends [JpaRepository](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html), and thus inherits its methods. There is an example UserRepository located in the folder.

## Service
The service folder holds services that manage the repositories directly. The services are called in the controllers.

## Controller
The controller folder holds REST controller classes. Tags are used to specifiy different requests.

Example: GET request http://localhost:8080/api/users/ will return a list of all users.

# Database

The database is stored in the demodb.mv.db file in the main folder. 

Any changes you make to the database will be persisted and saved in the files for the next time the application runs.

There is already a database with some data in the demodb.mv.db file, so the application can be used. To reset/initialize the database, add the SQL insert statements for your data in the /src/main/resources/data.sql file and add the below statement to the application.properties file in the same folder.

```bash
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=create
```
This will overwrite the database file each time you restart the server.

If you want the data.sql to just update the database, you can add the following to the application.properties files instead.

```bash
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=update
```

To get a better view of the database, there is a H2 Console located at [http://localhost:8080/h2-console](http://localhost:8080/h2-console). 

![image](https://github.gatech.edu/storage/user/58295/files/a63a0230-4917-4fca-99b6-95f45f4ce9b3)

Make sure that the JDBC URL is set to jdbc:h2:file:./demodb. The password is currently set to 1.


You can edit the database in this console and make SQL queries. Any changes will be saved to the database file.

Example: To see the USERS table, run the command SELECT * FROM USERS.

# More Help 
Some helpful links:

## React/REST
[React JS + Spring Boot REST API Example Tutorial](https://www.youtube.com/watch?v=5RA5NpxbioI)
[React.js and Spring Data REST](https://spring.io/guides/tutorials/react-and-spring-data-rest/)

## H2 Database
[Spring Boot With H2 Database](https://www.baeldung.com/spring-boot-h2-database)
[Integrating H2 Database with Spring Boot](https://stackabuse.com/integrating-h2-database-with-spring-boot/)



