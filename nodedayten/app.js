const express = require('express');

const fs = require('fs');
const bodyParser = require('body-parser')
const lineReader = require('line-reader');
const session = require('express-session')
const path = require("path")


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000 }
  }))




let count = 0;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.get('/', (req, res) => {
    res.send('dasdf')
});

app.get('/time', (req, res) => {
    res.send(`${new Date().getTime()}`)
});

app.get('/file', (req, res) => {
    fs.createReadStream('something.txt').pipe(res);

    // fs.readFile("something.txt", "utf8", (err, data) => {
    //     res.send(data);
    // })
});
app.post('/newuser', (req, res)=>{

    if(req.session.views){
        req.session.views ++;
    }
    else{
        req.session.views = 1;
    }
    

    // let firstName = req.body.first;
    // let lastName = req.body.last;
    // let userName = req.body.username

    let obj = {
        ...req.body,
        time: new Date().getTime(),
        count: count++,

    }

    console.log(req.session.views);

    fs.createWriteStream("new.json", {flags: 'a'}).write(JSON.stringify(obj) + "\n")

    res.redirect('/view');
});

app.get('/sessionusers', (req,res) => {
    res.send(`Users Created this Session: ${req.session.views}`)
})

app.get('/lookup', (req, res) => {
    res.send(`
       <form method = "post" action="/lookupname">
            <input name = "name" placeholder="name" type="text"/> 
            <input type ="submit"></input>
       </form> `)
})

app.post('/lookupname', (req, res) => {
    
    
    lineReader.eachLine('new.json', function(line) {
   
        if(line){
            let obj = JSON.parse(line);
            if(obj.first == req.body.name){
               res.send(obj);
            }
        }
    });
});

app.get('/view', (req, res) => {

    let arr = [];


    let thing = new Promise((resolve, reject) => {
        
        lineReader.eachLine('new.json', function(line) {
            arr.push(JSON.parse(line));
        }, function finished (err) {
          if (err) return reject(err);
          resolve(arr);
        });
      });
    
      thing.then(a => res.render("show", {users: a}))
    
});

app.get('/view/:username', (req, res) => {
      
    lineReader.eachLine('new.json', function(line) {
   
        if(line){
            let obj = JSON.parse(line);
            if(obj.username == req.params.username){
               res.send(obj);
            }
        }
    });
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("something Broke")
})

app.listen(3000, () => {
    console.log("app is listening on port 3000!")
})
