## ToDo-List Project
#### This Repository was made for learning more about simple web technologies. 
#### The main idea was to build a website w/ a todo list that storages the data on your browser.
**I adapted the code to consume an api instead of localstorage, so now i'm using a api developed with Spring boot and the H2 database, which allows database management without having to download anything**

## Preview
https://camimcl.github.io/BasicToDoList

## How to use
To test the application, clone the repository, separate the API code in the *backend* folder (make sure to check the ports used) and run the spring application.\
You can check the api at: http://localhost:8081/api/task \
And the database at:
http://localhost:8081/h2-console \
remember to check the datasource url in application.properties \
After running the api, you can test the application with live server.

## Content 
Here I used some basic concepts of Javascript to build the following structures:

- *Simple minimalist design*
- *CRUD & LocalStorage:* To store the tasks data based on the operations READ, DELETE, CREATE & UPDATE. (old version)
  
## Used Technologies
- *HTML, CSS, JS : for the frontend* 
- *Spring Boot: REST CRUD API and Database management*
- *H2 Database*
- *Lombook*
- *Maven*
  
