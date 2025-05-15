const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const {
  client,
  createUser,
  createProduct,
  createTables,
  fetchUsers,
  fetchProducts,
  fetchUserCart,
  addToCart,
  removeFromCart,
  fetchSingleProduct,
  fetchSingleUser,
  changeQuantity,
  editProduct,
  deleteProduct,
  findUserWithToken,
  authenticate,
  signToken,
  clearCart,
} = require("./db");

const server = express();
client.connect();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (token) {
      const user = await findUserWithToken(token);

      if (!user || !user.id) {
        next({
          name: "Unauthorized",
          message: "You must be logged in to do that",
        });
        return;
      } else {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const isLoggedIn = async (req, res, next) => {
  try {
    console.log("*****", req.headers.authorization);
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await findUserWithToken(req.headers.authorization);
    if (!user || !user.is_admin) {
      next({
        name: "Unauthorized",
        message: "You must be an admin to do that",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

server.get("/api/products", async (req, res, next) => {
  try {
    const products = await fetchProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

server.get("/api/products/:id", async (req, res, next) => {
  try {
    const product = await fetchSingleProduct(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

server.post("/api/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

server.post("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
      return;
    }
    const user = await authenticate({ username, password });
    if (!user) {
      next({
        name: "AuthenticationError",
        message: "Invalid username or password",
      });
      return;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

server.get("/api/users", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

server.get("/api/user_cart", isLoggedIn, async (req, res, next) => {
  try {
    const userCart = await fetchUserCart(req.user.id);
    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

server.get(
  "/api/user/:user_id",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const user = await fetchSingleUser(req.params.user_id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

server.post("/api/user_cart", isLoggedIn, async (req, res, next) => {
  try {
    const userCart = await addToCart(
      req.user.id,
      req.body.product_id,
      req.body.quantity || 1
    );
    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

server.post("/api/products", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const { name, description, img_url, price } = req.body;
    if (!name || !description || !img_url || !price) {
      next({
        name: "Error",
        message:
          "Please provide all required fields: name, description, img_url, and price",
      });
      return;
    }
    const product = await createProduct(name, description, img_url, price);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

server.put("/api/user_cart/:product_id", isLoggedIn, async (req, res, next) => {
  try {
    const userCart = await changeQuantity(
      req.user.id,
      req.params.product_id,
      req.body.quantity
    );
    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

server.put(
  "/api/products/:product_id",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { name, description, img_url, price } = req.body;
      if (!name || !description || !img_url || !price) {
        next({
          name: "Error",
          message:
            "Please provide all required fields: name, description, img_url, and price",
        });
        return;
      }
      const product = await editProduct(
        req.params.product_id,
        name,
        description,
        img_url,
        price
      );
      res.send(product);
    } catch (error) {
      next(error);
    }
  }
);

server.delete(
  "/api/user_cart/:product_id",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await removeFromCart(req.user.id, req.params.product_id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

server.delete(
  "/api/products/:product_id",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      await deleteProduct(req.params.product_id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

server.delete("/api/user_cart", isLoggedIn, async (req, res, next) => {
  try {
    await clearCart(req.user.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
server.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).send({
    name: error.name || "Error",
    message: error.message || "Internal server error",
  });
});
