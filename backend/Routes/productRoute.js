
// const express = require("express");
// const path = require('path');
// const db = require("../config/connection");

// const productRoute = express();

// // Set EJS as the templating engine
// productRoute.set('view engine', 'ejs');
// productRoute.set('views', path.join(__dirname, 'views'));

// // Home route to fetch and display products
// productRoute.get('/products', (req, res) => {
//     const query = 'SELECT * FROM products';
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error executing query:', err.message);
//         return res.status(500).send('Database error');
//       }
//       res.send({ data: results });
//     });
//   });

//   productRoute.post('/add', (req, res) => {
//     const { id, image, name, price, type, description } = req.body;
//     const query = 'INSERT INTO products (id, image, name, price, type, description) VALUES (?, ?, ?, ?, ?, ?)';
//     db.query(query, [id, image, name, price, type, description], (err, results) => {
//       if (err) {
//         console.error('Error executing query:', err.message);
//         return res.status(500).send('Database error');
//       }
//       res.send({ data: results });
//     });
//   });

  


// module.exports = {
//     productRoute
// }

const express = require("express");
const db = require("../config/connection");

const productRoute = express.Router();

// Home route to fetch and display products
productRoute.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

//particular products
productRoute.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.send({ data: results[0] });
  });
});


//Adding the data in add route
productRoute.post('/add', (req, res) => {
  const { id, image, name, price, type, description } = req.body;
  const query = 'INSERT INTO products (id, image, name, price, type, description) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, image, name, price, type, description], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

// PUT route to update a product completely
productRoute.put('/update/:id', (req, res) => {
  const { image, name, price, type, description } = req.body;
  const query = 'UPDATE products SET image = ?, name = ?, price = ?, type = ?, description = ? WHERE id = ?';
  db.query(query, [image, name, price, type, description, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

// PATCH route to update a product partially
productRoute.patch('/update/:id', (req, res) => {
  const updates = req.body;
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(req.params.id);

  const query = `UPDATE products SET ${fields} WHERE id = ?`;
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

// DELETE route to delete a product
productRoute.delete('/delete/:id', (req, res) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

// Filter products by type, price range, etc.
productRoute.get('/products/filter', (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const queryParams = [];

  if (type) {
    query += ' AND type = ?';
    queryParams.push(type);
  }
  if (minPrice) {
    query += ' AND price >= ?';
    queryParams.push(minPrice);
  }
  if (maxPrice) {
    query += ' AND price <= ?';
    queryParams.push(maxPrice);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

// Define allowed columns for sorting
const allowedColumns = ['id', 'image', 'name', 'price', 'type', 'description'];

// Sort products by creation time

productRoute.get('/products/sort', (req, res) => {
  const { column = 'price', order = 'asc' } = req.query; // Default to id column and ascending order
  const validOrders = ['asc', 'desc'];

  // Validate column and order
  if (!allowedColumns.includes(column.toLowerCase())) {
    return res.status(400).send('Invalid sort column');
  }
  if (!validOrders.includes(order.toLowerCase())) {
    return res.status(400).send('Invalid sort order');
  }

  const query = `SELECT * FROM products ORDER BY ${column} ${order.toUpperCase()}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Database error');
    }
    res.send({ data: results });
  });
});

module.exports = {
  productRoute
};

