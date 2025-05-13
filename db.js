const pg = require("pg");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "keep it secret";

const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://postgres@localhost/acme_backend_store_db"
);

const createTables = async () => {
  SQL = `
    DROP TABLE IF EXISTS user_carts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;

    CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    mailing_address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    billing_address VARCHAR(255)
    );

    CREATE TABLE products(
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
    );

    CREATE TABLE user_carts(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    CONSTRAINT unique_cart UNIQUE (user_id, product_id),
    quantity INTEGER NOT NULL DEFAULT 1
    );
    `;

  await client.query(SQL);
};

const authenticate = async ({ username, password }) => {
  const SQL = `
      SELECT id, password FROM users WHERE username=$1;
    `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    return null;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token, user_id: response.rows[0].id };
};

const findUserWithToken = async (token) => {
  const { id } = await jwt.verify(token, JWT);

  const SQL = `SELECT * FROM users WHERE id=$1`;
  const response = await client.query(SQL, [id]);

  return response.rows[0];
};

const signToken = async (user_id) => {
  return jwt.sign({ id: user_id }, JWT);
};

const createUser = async ({
  username,
  password,
  name,
  mailing_address,
  is_admin = false,
}) => {
  console.log(username, password);
  const SQL = `INSERT INTO users (id, username, password, name, mailing_address, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 10),
    name,
    mailing_address,
    is_admin,
  ]);
  return response.rows[0];
};

const createProduct = async (name, description, img_url, price) => {
  const SQL = `INSERT INTO products (id, name, description, img_url, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    description,
    img_url,
    price,
  ]);
  return response.rows[0];
};

const addToCart = async (user_id, product_id, quantity) => {
  const SQL = `INSERT INTO user_carts (id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *`;
  const response = await client.query(SQL, [
    uuid.v4(),
    user_id,
    product_id,
    quantity,
  ]);
  return response.rows[0];
};

const changeQuantity = async (user_id, product_id, quantity) => {
  const SQL = `UPDATE user_carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3`;
  await client.query(SQL, [quantity, user_id, product_id]);
};

const removeFromCart = async (user_id, product_id) => {
  const SQL = `DELETE FROM user_carts WHERE user_id = $1 AND product_id = $2`;
  await client.query(SQL, [user_id, product_id]);
};

const deleteProduct = async (product_id) => {
  const SQL = `DELETE FROM products WHERE id = $1`;
  await client.query(SQL, [product_id]);
};

const fetchUsers = async () => {
  const SQL = `SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchSingleUser = async (user_id) => {
  const SQL = `SELECT * FROM users WHERE id = $1`;
  const response = await client.query(SQL, [user_id]);
  return response.rows[0];
};

const fetchProducts = async () => {
  const SQL = `SELECT * FROM products`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchSingleProduct = async (product_id) => {
  const SQL = `SELECT * FROM products WHERE id = $1`;
  const response = await client.query(SQL, [product_id]);
  return response.rows[0];
};

const editProduct = async (product_id, name, description, img_url, price) => {
  const SQL = `UPDATE products SET name = $1, description = $2, img_url = $3, price = $4 WHERE id = $5`;
  await client.query(SQL, [name, description, img_url, price, product_id]);
};

const fetchUserCart = async (user_id) => {
  const SQL = `SELECT * FROM user_carts WHERE user_id = $1`;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

module.exports = {
  client,
  createUser,
  createProduct,
  createTables,
  fetchUsers,
  fetchProducts,
  fetchUserCart,
  addToCart,
  removeFromCart,
  fetchSingleUser,
  fetchSingleProduct,
  deleteProduct,
  changeQuantity,
  editProduct,
  findUserWithToken,
  authenticate,
  signToken,
};
