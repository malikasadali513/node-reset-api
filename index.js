const bookRoute = require("./routes/bookRoutes")
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const session = require("express-session");
// const cors = require('cors');
dotenv.config();


// CONNECT THE DATABASE
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
  }; 
  
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL, options)
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log(` Database did not connect because ${err}`);
    });
    app.set('view engine', 'ejs');
    // routes
    app.use("", require("./routes/bookRoutes"))
  
    // Middleware
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(
      session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
      })
    );
    app.use((req, res, next)=>{
      res.locals.message = req.session.message;
      delete req.session.message;
      next();
    });
    // set templet enigin
    app.set('view engin', 'ejs');
    // app.use(cors());
    // route middleware
    app.use("/api", bookRoute);

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));