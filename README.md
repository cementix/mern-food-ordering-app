# MERN Food Ordering App

A full-stack **food ordering system** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project helped me understand the core principles of **React**, backend logic, and **MongoDB** — from building REST APIs to handling authentication and payments.

---

## 📖 Overview

MERN Food Ordering App is a web application where users can browse meals, add them to their cart, place orders, and pay using **Stripe**.  
The backend handles order management, authentication, and database interactions, while the frontend ensures a smooth, reactive user experience.

This project was a major milestone in mastering:
- React fundamentals and state management  
- Backend architecture with Express and Node.js  
- Working with MongoDB and Mongoose ORM  
- Secure payment integration (Stripe API)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Token) |
| Payments | Stripe API |
| Styling | CSS Modules / Tailwind (depending on version) |

---

## 🧱 Project Structure

```

mern-food-ordering-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── context/        # State management
│   │   ├── utils/          # Helper functions
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/             # MongoDB & Stripe config
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js
│
├── .env.example
├── package.json
└── README.md

````

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/cementix/mern-food-ordering-app.git
cd mern-food-ordering-app
````

### 2. Install dependencies

```bash
# root (server)
npm install

# client
cd client
npm install
```

### 3. Environment variables

Create `.env` files for both backend and frontend.

#### Root `.env`:

```env
PORT=5000
MONGO_URI="your_mongodb_connection"
JWT_SECRET="your_secret_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

#### Client `.env`:

```env
VITE_API_URL="http://localhost:5000"
STRIPE_PUBLISHABLE_KEY="your_stripe_public_key"
```

---

## 🧩 Database Setup

The app uses **MongoDB Atlas** or a local Mongo instance.

For local use:

1. Install MongoDB locally or run via Docker:

   ```bash
   docker run -d -p 27017:27017 mongo
   ```
2. Update your `.env` with:

   ```env
   MONGO_URI=mongodb://localhost:27017/foodapp
   ```

---

## 🧠 Development

### Start backend

```bash
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (Vite) or the default React dev port if configured differently.

---

## 🔗 Core Features

* 🍱 User authentication (register/login with JWT)
* 🛒 Add to cart & order management
* 💳 Stripe payment integration
* 📦 Real-time order tracking (admin dashboard)
* 🧾 Admin route protection & CRUD for menu items
* 🧩 REST API architecture with Express
* ⚙️ State management with React Context

---

## 🧾 API Endpoints

| Method  | Route                    | Description                 |
| ------- | ------------------------ | --------------------------- |
| `POST`  | `/api/auth/register`     | Create new user             |
| `POST`  | `/api/auth/login`        | User login                  |
| `GET`   | `/api/meals`             | Get all meals               |
| `POST`  | `/api/orders`            | Create a new order          |
| `GET`   | `/api/orders/:id`        | Get order by ID             |
| `PATCH` | `/api/orders/:id/status` | Update order status (admin) |
| `POST`  | `/api/payment`           | Handle Stripe payment       |

---

## ☁️ Deployment

Recommended:

* **Frontend:** Render, Netlify, or Vercel
* **Backend:** Render, Railway, or Heroku
* **Database:** MongoDB Atlas

Steps:

1. Add `.env` variables to hosting environment.
2. Deploy client and server separately or via combined setup.
3. Connect backend to MongoDB Atlas.
4. Test Stripe payment flow in sandbox mode.

---

## 🧤 Developer Notes

* JWT-based auth for secure sessions
* Backend structured by controllers and routes
* React Context used for global state
* Stripe test keys used for development
* CORS enabled for local dev

это README оформлен ровно под стиль двух предыдущих:  
технический, аккуратно структурированный, без маркетинга, всё в английском.  
если хочешь, я добавлю в начало короткий блок `This project helped me understand...` в более личном формате, как intro-текст сверху (например как абзац перед Overview)?
```
