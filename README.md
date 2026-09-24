# Kamboj Store

**Kamboj Store** is a full-stack T-shirt e-commerce website built for a small clothing business. It allows customers to browse products, add items to their cart, place orders, and make online payments through Razorpay.

The project also includes a separate **Admin Panel** for managing products and orders.

## 🚀 Features

### Customer

* User registration and login
* Browse T-shirts and products
* View product details
* Select size and quantity
* Add and remove products from cart
* Persistent shopping cart
* Place orders
* Online payment using Razorpay
* View order details

### Admin

* Add new products
* Upload product images
* Manage products
* View customer orders
* Manage order status

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### Third-Party Services

* **MongoDB Atlas** — Database
* **Cloudinary** — Product image storage
* **Razorpay** — Online payments

## 📁 Project Structure

```text
Kamboj-Store/
│
├── frontend/          # Customer-facing website
├── admin/             # Admin dashboard
└── backend/           # Node.js + Express API
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* MongoDB Atlas account
* Cloudinary account
* Razorpay account

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Kamboj-Store
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

#### Admin

```bash
cd ../admin
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `backend` directory:

```env
MONGODB_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Add your own credentials to these variables.

**Never commit your `.env` file or secret credentials to GitHub.**

### 4. Run the Project

Start the backend:

```bash
cd backend
npm run server
```

Start the customer frontend:

```bash
cd frontend
npm run dev
```

Start the admin panel:

```bash
cd admin
npm run dev
```

The development URLs will be displayed in the terminal.

## 💳 Payment Flow

Kamboj Store uses **Razorpay** for online payments.

```text
Customer
   ↓
Checkout
   ↓
Backend creates Razorpay order
   ↓
Razorpay Checkout
   ↓
Payment
   ↓
Payment verification
   ↓
Order stored in MongoDB
```

## 🖼️ Image Management

Product images are uploaded to **Cloudinary** rather than being stored directly in the application.

```text
Admin uploads product
        ↓
Backend
        ↓
Cloudinary
        ↓
Image URL
        ↓
Product stored in MongoDB
        ↓
Customer sees product image
```

## 🗄️ Database

**MongoDB Atlas** is used to store application data such as:

* Users
* Products
* Cart data
* Orders

## 🌐 Deployment

The application can be deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Images:** Cloudinary
* **Payments:** Razorpay

Environment variables should be configured separately on the deployment platforms.

## 🔐 Security

* Sensitive credentials are stored using environment variables.
* `.env` files are excluded from Git.
* Authentication uses JWT.
* Payment verification is handled through the backend.

## 📌 Future Improvements

* Product search and advanced filtering
* Wishlist functionality
* Product reviews and ratings
* Improved admin analytics
* Order tracking
* Additional payment methods
* Better mobile optimization

## 👨‍💻 Author

**Harsimran Singh**

---

⭐ If you find this project useful, feel free to explore the repository and give it a star.
