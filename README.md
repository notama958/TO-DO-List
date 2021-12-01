# MERN Project > TODO list :four_leaf_clover:

## ver 1.0.0

To-do list is a light-weight notebook to record daily tasks

# Features

- [x] Create random list with automatic 3 tasks
- [x] Create list by interest
- [x] Get random list from database
- [x] Get list with list id
- [x] Edit a list
- [x] Delete a list

# Upcomming Features

- [ ] Create account and login

## Tech

1. Backend
   - Node.js - Express framework
   - faker.js - generate fake data
   - mongo atlas - with mongoose
   - express-validator - middleware for validator
   - nodemon
2. Frontend
   - react app
   - redux
   - react-redux
   - react-router-dom
   - redux-devtools-extension - fancy UI debugging on browser
   - redux-thunk - middleware
   - uuid - for alert
   - axios - HTTP client
3. Testing
   - Front
     - redux-mock-store
     - redux-test-renderer
     - @tesing-library/react
   - Back
     - chai
     - mocha
     - supertest
4. Deploy
   - heroku
5. Demo
   - please kindly check demo folder
     ![demo-gif](https://drive.google.com/file/d/1az8P3UHRI5-2oDtzs6xftWXwD3xnA9ob/view?usp=sharing)

## Instructions

- install required node modules
- docker compose-up -d to run containers || seperate running _npm run dev_ in _backend_ and _npm run start_ in _frontend_
- testing:
  - backend: npm test + npm run test:unit
  - frontend: npm test

### Author: yen tran :fish:
