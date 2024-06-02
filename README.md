# Online Store Project

This project is a web application for an online store developed with Node.js. It allows administrators to add products and users to create accounts to access the store and add products to their cart. The project was collaboratively developed using the Live Share extension of Visual Studio Code.

## Contributors

- **Davide Flamini**
- **Nicolas Cuellar**
- **Daron Mercado**
- **Miguel Angel Martinez**

## Features

- Login page with a predefined admin user.
- Ability to add products (admin only).
- User account creation for accessing the store.
- Store page displaying products with name, price, description, and image.
- Add to cart functionality.

## Requirements

- Node.js
- npm (Node Package Manager)

## Installation

### Install Node.js and npm

1. Download and install Node.js from [nodejs.org](https://nodejs.org/). The npm package manager is included with Node.js.

2. Verify the installation by running the following commands in your terminal:

   ```sh
   node -v
   npm -v
   ```

   You should see the versions of Node.js and npm displayed.

### Clone the Repository

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install the necessary dependencies:

   ```sh
   npm install express
   ```

## Configuration

No additional configuration is required as the project uses JavaScript files for data storage instead of a database.

## Running the Server

To start the server, navigate to the root directory and execute the following command:

```sh
node src/server/server.js
```

The server will be running at `http://localhost:3000`.

## Usage

### Login

1. Navigate to `http://localhost:3000/login`.
2. Log in with the following credentials:

   - **Admin User:**
     - **Username:** admin
     - **Password:** admin

   - **Normal User:**
     - **Username:** 123
     - **Password:** 123

### Adding Products

1. Log in as an admin.
2. Navigate to the product administration page.
3. Add product details, including name, price, description, and image.

### Creating a User and Accessing the Store

1. Navigate to the registration page and create a new user account.
2. Once registered, log in with the new account.
3. Access the store to view available products and add them to the cart.

---

Thank you for using our online store application!
