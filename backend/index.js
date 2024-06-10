
const express = require("express");

const dotenv = require("dotenv");
const db = require("./config/connection");
const { route } = require("./Routes/userRoute");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use("/user", route)

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