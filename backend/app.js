const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const userRouter=require("./Routes/auth")
const cookieParser = require('cookie-parser');
const registerRouter=require('./Routes/register')
const session = require('express-session')
const mongoStore=require('connect-mongo')
const passport = require('passport');
const bodyParser = require('body-parser');
const profileRouter=require('./Routes/profile')
const app=express();
const port=8080;
mongoose.connect("mongodb+srv://gajanang:UU81dsa1f6Mvhs0R@cluster0.d8rlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to DB")
});

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',                  
  resave: false,                           
  saveUninitialized: false,                
  store: mongoStore.create({
    mongoUrl: 'mongodb+srv://gajanang:UU81dsa1f6Mvhs0R@cluster0.d8rlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    collectionName: 'sessions'
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,           
    secure: false,                         
    httpOnly: true                       
  }
}));


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,    
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use('/auth',userRouter);
app.use('/register',registerRouter)
app.use('/profile',profileRouter)

app.listen(port,()=>{
    console.log("Server is Listening to Port: "+port);
})