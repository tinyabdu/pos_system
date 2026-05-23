# POS PRO - Point of Sale System

A modern, responsive Point of Sale system built with React, Vite, and Tailwind CSS. It features a black-and-white minimalist design, dark mode support, and receipt generation capabilities (Print & PDF).

## Features
- **Authentication**: Mock login system.
- **Dashboard**: High-level overview of sales, orders, and customers.
- **Inventory**: Product management list.
- **Sales (POS)**: Shopping cart functionality with print and PDF receipt generation using `html2pdf.js`.
- **Customers**: View customer list and details.
- **Settings**: Store configuration and preferences.
- **Theming**: Integrated Dark / Light mode toggle.

## API Documentation (Proposed)

To connect this frontend to a real backend, the following API endpoints would be required:

### Authentication
- `POST /api/auth/login` - Authenticate user and return JWT token.
- `POST /api/auth/logout` - Invalidate current session.
- `GET /api/auth/me` - Get current user profile.

### Inventory (Products)
- `GET /api/products` - List all products (supports pagination, search).
- `GET /api/products/:id` - Get details of a specific product.
- `POST /api/products` - Create a new product.
- `PUT /api/products/:id` - Update an existing product.
- `DELETE /api/products/:id` - Remove a product.

### Sales & Orders
- `GET /api/orders` - List previous orders.
- `POST /api/orders` - Submit a new order / transaction. Expects cart items and payment details.
- `GET /api/orders/:id/receipt` - Retrieve order receipt data.

### Customers
- `GET /api/customers` - List all customers.
- `POST /api/customers` - Add a new customer.
- `GET /api/customers/:id` - Get specific customer history.

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`


# Testing
- `address` - https://pos-system-six-ebon.vercel.app/login