Project STILL (esp: ANKORA)

<br/>

Prerequisites:
- nodeJS
- mongoDB

<br/>

To use this backend application, use the following instructions:
- Clone the repository from https://github.com/ArmelHadzic/still.git
- Navigate to the root of the cloned repository and run ```npm install``` to get all the dependencies required

<br/>

To be able to run available endpoints, we need data in the DB.

To enter data:
 - Navigate to ```'./seeders'```.
 - In the following command
 ```npx cross-env MONGO_DB_URI=your_mongodb_uri MONGO_DB_NAME=your_mongodb_name node seed.js```
 enter your own ```MONGO_DB_URI``` and ```MONGO_DB_NAME``` and run
 
 (Example: ```npx cross-env MONGO_DB_URI=mongodb://localhost:27017 MONGO_DB_NAME=ankora_db node seed.js```)

 <br/>

 Run the application using ```npm run start```

 <br/>

 There are 4 endpoints available:
 - To get multiple users - GET http://localhost:3000/users
 - To get a single user - GET http://localhost:3000/users/:id
 - To create a new user - POST http://localhost:3000/users
 - To update an existing user - PUT http://localhost:3000/users/:id

 GET endpoints can be used inside the browser and they will return
 - All users that match query params. If no params are provided, all users will be returned
(The available params that can be used are: firstName, lastName, email, phoneNumber)
 - Single user if the ID is provided

POST and PUT endpoints can be used only through POSTMAN or a similar tool since there is no frontend part built via which those requests could be used inside the browser.
To create a new user, the ```firstName``` and ```email``` params are mandatory.
