const express = require('express');

const app = express();
let count = 0;

app.get(/.*apple$/, (req, res) => {
    count++;

    res.send("Got apple at the end: " + count)
});

app.listen(3000, () => {
    console.log(`Server started on 3000`);
});