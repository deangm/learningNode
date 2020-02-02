const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const router = express.Router()

let app = express()


app.use(session({ secret: "hahaahahaha", cookie: { maxAge: 60000 } }))

app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: '252459947638-e7c306gt0u9tr19ej66jsguq5fhkgouj.apps.googleusercontent.com',
    clientSecret: '2jO1A2G52b4oGofk-aFgQXAl',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    (accessToken, refreshToke, profile, done) => {
        done(null, profile)
    }))


app.get("/", (req, res) => {
    res.render('index')
})

app.use('/auth', router);

router.route('/google/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/userListing');
    })

router.route('/google')
    .get(passport.authenticate('google', {
        scope:['https://www.googleapis.com/auth/plus.login']
    }));

    app.listen(3000, () => {
        console.log(`Server started on 3000`);
    });

app.get('/userListing', (req, res) => {
    console.log(req.user);
    res.end();
})