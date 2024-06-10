
const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const db = require("./config/connection");
const { route } = require("./Routes/userRoute");
const { productRoute } = require("./Routes/productRoute");
const cors = require('cors');
dotenv.config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(express.json());
app.use(cors());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/user", route)
app.use("/products", productRoute)

// Home route to fetch and display products
// app.get('/products', (req, res) => {
//     const query = 'SELECT * FROM products';
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error executing query:', err.message);
//         return res.status(500).send('Database error');
//       }
//       res.send({ data: results });
//     });
//   });

//   app.post('/add', (req, res) => {
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

//   app.get('/add-product', (req, res) => {
//     res.render('add-product');
//   });

const port = process.env.PORT

app.listen(port, async() => {
    try{
     await  db.connect((err) => {
        if (err) {
          throw err;
        }
        console.log("Connected to the database");
        console.log(`Server running on port ${port}`);
      });
    }catch(err){
        console.log({err:err.message})
    }
   
  });