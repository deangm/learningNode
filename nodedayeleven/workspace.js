const express = require('express');
const session = require('express-session')

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }
  }))

app.use((req,res,next) => {
    console.log(`${req.method} for ${req.url}`);
    next();
    
});

app.use(express.static('./public'));

app.get('/views', (req, res) => {
    if(req.session.views){
        req.session.views ++;
        res.write(`views: ${req.session.views}`);
        res.write(`expires: ${req.session.cookie.maxAge/1000}s`);
        res.end();
    }
    else{
        req.session.views = 1;
    }
    res.send("Welcome to session demo, refresh!");
})

app.use((err, req, res, next) => {
    console.log("ERROR");
    res.status(500).send("something Broke")
})

app.listen(3000, () => {
    console.log("listening 3000")
})

