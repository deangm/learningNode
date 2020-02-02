const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title: "My Server Title", message: "this is a variable message"});
});

app.listen(3000, () => {
    console.log(`Server started on 3000`);
});