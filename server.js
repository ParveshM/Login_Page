const express=require('express')
const app=express()
const path= require('path')
const bodyparser=require('body-parser');
const session = require('express-session');
 const {v4:uuidv4}=require('uuid')
 const router=require('./router')
 const nocashe=require('nocache')

const port=process.env.port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(nocashe())

// load Static
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.static(path.join(__dirname, "views/public/assets")));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

// Home Route 
app.get('/login',(req,res)=>{
    if(req.session.user){
       res.redirect('/route/dashboard')
    }else{
         res.render('base',{title:'Login System'}) 
    }
})

app.listen(port,()=> 
console.log(`Server Started on http://localhost:${port}/login`))