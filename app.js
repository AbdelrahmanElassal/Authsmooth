import express from 'express';
import router from  './routes/authRoutes.js';
import {checkTokenMid , checkUser} from './middleware/authmid.js'
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser())

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', checkTokenMid ,(req, res) => res.render('smoothies'));
app.use(router);

app.listen(8080 , ()=>{
  console.log("server is listening");
});