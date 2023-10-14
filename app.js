import express  from "express";
import dotenv from "dotenv";

import path from 'path'
import bodyParser from "body-parser";
import ruta from './routes/index.js'



import session from "express-session";
const app = express();



app.use(express.json());

//3 invocar dotenv
app.set(app.set('port'), process.env.PORT || 3000)
dotenv.config({path:'./env/.env'});


app.use(bodyParser.urlencoded({extended: true}));
// 4 directorio public

app.use('/static', express.static('public'));

// 5
app.set('view engine', 'ejs');

// 6 invocar encriptado

// 7
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use('/', ruta)


  

app.listen(3000, (req, res)=>{
    console.log('servidor funcionado')
})