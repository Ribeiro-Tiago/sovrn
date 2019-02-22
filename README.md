# How to run
- rename .env_example to .env
- add mongodb connection uri to .env "DB_SERVER" variable
- npm install
- npm start

# Once running 
You can access via ``http://localhost:8080/{endpoint}`` and then use one of the endpoints:
- GET roman/{number} > to convert the arabic {number} to the respective roman
- GET arabic/{number} > to convert the roman {number} to the respective arabic 
- DELETE remove/all > to clear all stored conversions
- GET all/{type} > to list all stored conversions of {type}