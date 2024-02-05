import express from 'express';
import router from  './routes/authRoutes.js';

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(router);

app.listen(8080 , ()=>{
  console.log("server is listening");
});