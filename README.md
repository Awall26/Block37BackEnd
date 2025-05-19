# E-Commerce Store Backend - Final Project

## Project Overview

For my final project, I built a backend API for an e-commerce store using Node.js and PostgreSQL. This project demonstrates my understanding of full-stack development, database management, and API design.

## What I Built

I created a RESTful API that handles:

- User authentication and management
- Product catalog
- Shopping cart functionality

## Technical Implementation

### Database Design

I designed three main tables to store all necessary data:

1. **Users Table** - Where I store all user information:

   - Each user gets a unique ID (UUID)
   - Username must be unique
   - Passwords are stored securely (hashed)
   - Additional fields for user details (name, email, addresses)

2. **Products Table** - My product catalog:

   - Each product has a unique ID
   - Stores product details (name, description, price)
   - Includes image URL for product display

3. **Shopping Cart Table** - Handles user shopping carts:
   - Links users to their selected products
   - Tracks quantity of each item
   - Prevents duplicate items in cart

### Key Features I Implemented

#### User Authentication

- Users can create accounts and log in
- Passwords are secured using bcrypt hashing
- JWT tokens keep users logged in
- Admin users have special privileges

#### Product Management

- Add new products to the store
- View all products or individual product details
- Update product information
- Remove products from the store

#### Shopping Cart System

- Add items to cart
- Update quantities
- Remove items
- View cart contents
- Clear entire cart

## How to Use This Project

### Setup Requirements

1. You'll need:
   - Node.js installed
   - PostgreSQL database
   - These environment variables:
     ```
     DATABASE_URL=your_database_connection_string
     JWT=your_secret_key
     NODE_ENV=development
     ```

### Security Features I Implemented

- Password hashing for user security
- JWT token authentication
- SSL support for production
- Protection against duplicate entries

### Error Handling

I made sure to handle various error cases:

- Database connection issues
- Invalid login attempts
- Duplicate usernames
- Invalid requests

## Technologies I Used

- `pg`: For PostgreSQL database connection
- `uuid`: To generate unique IDs
- `bcryptjs`: For password security
- `jsonwebtoken`: For user authentication

## Learning Outcomes

Through this project, I learned:

- How to design and implement a RESTful API
- Database design and management
- User authentication and security
- Error handling and debugging
- API endpoint organization

## Database Design Wireframe

Below is the initial wireframe I created to plan out the database structure and relationships between tables. This visual representation helped me understand how the different components of the system would interact with each other before implementing the actual database schema.

![image](https://github.com/user-attachments/assets/011b86ca-e1a2-4e1e-acb7-5b76338b0207)
