const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')
const users = require('./users');
const port = process.env.PORT || 3000; //PORT=5050 node app
const bcrypt = require('bcrypt');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'some random strings',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//add user to session  
passport.serializeUser((user, done) => { done(null, user); });
// after Logout take user out from session  
passport.deserializeUser((user, done) => { done(null, user); });

passport.use(new LocalStrategy({
    //default credential are username and password    
    usernameField: 'username',
    passwordField: 'password',
    session: false
},
    (username, password, done) => {
        let userfound = false;
        let passfound = false;
       

       let founduser =  users.forEach(user => {
            
            if(user.username == username){
                userfound = true;
                let isMatched = bcrypt.compareSync(password, user.password)
                if(isMatched){
                    passfound = true; 
                    return done(null, user);
                } 
            }
        })

        if(!userfound){
            console.log("BAD USER")
            return done(null, false, { message: 'Incorrect username.' });
        }
        else if(!passfound){
            console.log("BAD PASS")
            return done(null, false, { message: 'Incorrect password.' });

        }
      
    
    }));


app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/adduser', (req, res) => {
     res.redirect('adduser.html');
});

app.post('/adduser', (req, res) => {
    let salt = bcrypt.genSaltSync(12);
    let hashWord = bcrypt.hashSync(req.body.password, salt);
    users.push({
        username: req.body.username,
        password: hashWord,
    });
    res.redirect("/")
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/adduser',
    failureFlash: true
})
);

app.get('/login', (req, res) => {
    let errormessage = req.flash('error');
    res.append('errormessage', errormessage);
    res.redirect('/login.html');
})

app.get('/logout', (req, res) => {
    req.logout();
    //this is a passport call    
    res.redirect('/');
});



//Helper function:
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
//Protect resources. Must be logged in before access

app.get('/getfile', isLoggedIn, (req, res) => {
    let filepath = path.join(__dirname, 'public', 'protected.txt');
    res.sendFile(filepath);
});

app.get('/view', isLoggedIn, (req, res) => {
    res.send(users);
});


app.listen(3000, () => {
    console.log(`Server started on 3000`);
});