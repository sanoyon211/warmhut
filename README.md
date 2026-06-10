# WarmHut - Premium E-Commerce Platform

![WarmHut](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![React](https://img.shields.io/badge/Frontend-React.js-blue.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success.svg)

WarmHut is a modern, responsive, and full-stack e-commerce platform designed to sell premium winter clothing in Bangladesh. It features a sleek, professional UI with robust backend management, catering to both customers and administrators.

## 🚀 Features

### Customer Experience
* **Modern & Responsive UI:** Fully responsive design that works seamlessly on desktop, tablet, and mobile. Built with Tailwind CSS using a mobile-first approach.
* **Dynamic Homepage:** Sections automatically update based on the latest inventory added via the admin dashboard.
* **Authentication:** Secure login and registration powered by Better Auth, including Google OAuth integration.
* **Shopping Cart & Wishlist:** Persistent cart and wishlist management.
* **Seamless Checkout:** Simple checkout process with Cash on Delivery (COD) and mobile banking options.
* **User Dashboard:** Customers can view their order history, order statuses, and download invoice PDFs.
* **Newsletter Subscription:** Integrated newsletter sign-up to receive updates and exclusive offers.

### Admin Capabilities
* **Role-Based Access Control:** Secure admin routes protected by authentication middlewares.
* **Dashboard:** A comprehensive, mobile-responsive admin dashboard to oversee store operations.
* **Product Management:** Full CRUD operations (Create, Read, Update, Delete) for inventory, complete with image uploads and description editing.
* **Order Management:** View, track, and update the status of customer orders in real-time.
* **Promo Code Management:** Generate and manage discount codes with expiry dates and usage limits.
* **Customer Messages:** Read and manage queries submitted through the Contact Us page.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS (Utility-first styling, responsive design)
* React Router DOM (Routing)
* AOS (Animate on Scroll)
* jsPDF (Invoice generation)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* Better Auth (Authentication & Session Management)
* Nodemailer (Email notifications)
* Multer (File & Image uploads)

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/sanoyon211/warmhut.git
cd warmhut
```

### 2. Install Dependencies
You need to install dependencies for both the frontend and the backend.

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/warmhut
FRONTEND_URL=http://localhost:5173

# Better Auth
BETTER_AUTH_SECRET=your_super_secret_key_here
BETTER_AUTH_URL=http://localhost:5000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Nodemailer
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Run the Application
You can run both the frontend and backend concurrently using the root package.json scripts.

```bash
# Run both frontend and backend
npm run dev:all
```
* **Frontend:** Runs on `http://localhost:5173`
* **Backend:** Runs on `http://localhost:5000`

## 📂 Project Structure

```
warmhut/
├── server/                 # Backend Node/Express code
│   ├── models/             # MongoDB Mongoose schemas
│   ├── routes/             # API route handlers
│   ├── auth.js             # Better Auth configuration
│   └── index.js            # Main Express server setup
├── src/                    # Frontend React code
│   ├── components/         # Reusable UI components
│   ├── context/            # React Contexts (Cart, Wishlist, Toast)
│   ├── homepage-component/ # Dynamic sections for the homepage
│   ├── lib/                # API utility functions
│   ├── pages/              # Main page components (Home, Shop, Admin)
│   ├── NavFoot/            # Navigation and Footer
│   └── main.jsx            # React entry point
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

## 📄 License
This project is proprietary and intended for the WarmHut brand. All rights reserved.
