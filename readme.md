# 🍽️ SwiggyClone – Food Ordering & Restaurant Discovery App

A full-stack web application inspired by [Swiggy](https://www.swiggy.com), replicating its core functionality and user experience. Built to practice real-world web development, database design, and secure user authentication using modern technologies across the MERN stack.

---

## 🚀 Features

- 🧭 Discover restaurants and explore menus
- 👤 User registration and login with secure JWT authentication
- 🛒 Add items to cart, place orders (simulated)
- 🧾 Manage orders, view order history
- 💻 Responsive and modern UI using Tailwind CSS
- 🔐 Protected routes for logged-in users

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication

---

## 🧑‍💻 Getting Started (Local Setup)

### 📦 Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally

### 📁 Directory Structure

root/ \
├── Frontend/ # React frontend \
└── Backend/ # Express backend \


### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Eish-1/SWIGGY.git
cd SWIGGY
```
2. **Install Dependencies**

```bash
cd Frontend && npm install   # for frontend
cd ../Backend && npm install   # for backend
```
3. **Start Development Servers**

```bash
cd Frontend && npm run dev   # start backend server
cd ../Backend && npm start  # start frontend
```

4. **Environment Variables**

Create a .env file in the /server directory with the following:

```.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/swiggyclone
JWT_SECRET=your_jwt_secret
```

## Screenshots of the application:

![image](https://github.com/user-attachments/assets/ea8384e3-71a4-4096-83d2-2c09820b2921)

- For viewing restaurants and menu items

![image](https://github.com/user-attachments/assets/f374175c-4582-45d9-88dc-ef7a9fd48859)

![image](https://github.com/user-attachments/assets/543b3836-f55c-41ef-a893-9025f9fa9307)

- For Login or registration:

![image](https://github.com/user-attachments/assets/c9e297c0-d59e-4561-85f5-e8306268f950)

![image](https://github.com/user-attachments/assets/e8ff4f6b-ca1d-44ad-9401-b4d2a9f8d0df)

- Viewing orders, carts and owner’s restaurants:

![image](https://github.com/user-attachments/assets/2096f07c-fcd2-4c1a-a5ca-8b5dfaeb3b19)

![image](https://github.com/user-attachments/assets/8725fb91-3aff-469b-b48c-6d457a5a8d5c)

![image](https://github.com/user-attachments/assets/e22f4ef1-53bd-4db8-808e-626305c92d23)

![image](https://github.com/user-attachments/assets/306566e3-cf1a-4291-a3c2-4fcab43d44e5)

![image](https://github.com/user-attachments/assets/2be45377-8369-45b4-a3e1-7aaa79412b83)

### Learnings from this project

- Implemented full-stack features using the MERN stack

- Strengthened API handling, secure authentication, and role-based access

- Gained experience with React hooks, routing, and state management

### 📈 Future Improvements

Payment gateway integration (Razorpay/Stripe)

Admin dashboard for restaurant partners

Order tracking and delivery simulation

Better error handling and 404 pages

### 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository

2. Create your feature branch: git checkout -b feature/YourFeature

3. Commit your changes: git commit -m 'Add your feature'

4. Push to the branch: git push origin feature/YourFeature

5. Open a pull request

### 📄 License
This project is open source and available under the MIT License.

Made with ❤️ by Eish Chandeal
