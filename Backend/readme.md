npm install yup @hookform/resolvers

Start with React Context (built-in). If needed later:


# Api endpoint validation

- for the link: http://localhost:8000/api/users/register (for get)

{
"name": "Pranjal",
"email":"prang@gmail.com",
"password":"34343",
"phone": "1818182323",
"address":"1181 lbn"
}

---

1. Initialize Project & Install Dependencies

Run npm init -y and install necessary packages.

2. Setup Express Server

Create server.js and initialize an Express app.

3. Connect MongoDB

Inside config/db.js, write the connection logic.

4. Create Mongoose Models

Define schemas for User, Restaurant, Order, and Cart.

5. Setup API Routes

Create routes inside routes/ (e.g., authRoutes.js, restaurantRoutes.js).

6. Implement Authentication

Use JWT & bcrypt for user login/signup.

---

{
Add input validation
Implement more advanced error handling
Create comprehensive testing
Add more advanced features like rating, reviews, etc.
}

7. Add Order & Cart Functionality

Implement APIs for adding items to cart and placing orders.

8. Test APIs with Postman

Verify that backend APIs work before moving to frontend.

---

# The prompt

I am building a basic Swiggy clone using the MERN stack within a day. Right now only focused with the backend part of the code. Will build the frontend part later and connect it with the created backend

So I will give you my file directory structure through the image attached here.

All the packages that I have installed are:

├── bcryptjs@3.0.2

├── cookie-parser@1.4.7

├── cors@2.8.5

├── dotenv@16.4.7

├── express@4.21.2

├── jsonwebtoken@9.0.2

├── mongoose@8.13.0

├── morgan@1.10.0

└── nodemon@3.1.9

Now I want your help to write code. I will ask you to code specific parts later. For now just read and understand my plan , and explain it to me further.

The steps that will be involved in my opinion are:

1. Initialize Project & Install Dependencies

Run npm init -y and install necessary packages.

2. Setup Express Server

Create server.js and initialize an Express app.

3. Connect MongoDB

Inside config/db.js, write the connection logic.

4. Create Mongoose Models

Define schemas for User, Restaurant, Order, and Cart.

5. Setup API Routes

Create routes inside routes/ (e.g., authRoutes.js, restaurantRoutes.js).

6. Implement Authentication

Use JWT & bcrypt for user login/signup.

7. Add Order & Cart Functionality

Implement APIs for adding items to cart and placing orders.

8. Test APIs with Postman

Verify that backend APIs work before moving to frontend.

What do you think?
