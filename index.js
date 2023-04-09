const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
//const port = 3000;
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const fileName = 'scores.json';
const { calculateTotal, median } = require('./calculations');



// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('home');
});

// This is a RESTful GET web service
app.get('/scores', (request, response) => {
    data.sort((a, b) => (a.total < b.total) ? 1 : -1 );
    response.send(data);
});

// Getting median scores
app.get('/median', (request, response) => {
    //Create array to store int values
    let scores = [];

    //Get time from data
    let score  = data.map((item) => {
        //append time to times[]
        scores.push(item.total);
    });
    
    medianScore = median(scores).toFixed(2);
    response.send(medianScore.toString());
});

// Getting average of the totals
app.get('/average', (request, response) => {
    var sum = 0;
    var size = Object.keys(data).length;
    var average = 0;
    for (var i=0; i<size; i++) {
        sum += parseFloat(data[i].total);
    }
    average = (sum/size).toFixed(2);
    response.send(average.toString());
})

// This is a RESTful POST web service
app.post('/process_scores', jsonParser, (request, response) => {
    const studentName = request.body.name;
    const score1 = request.body.score1;
    const score2 = request.body.score2;
    if(studentName != null || Number.isInteger(score1) || Number.isInteger(score2)) {
        if(studentName){
            const i = data.findIndex(scores => scores.name === studentName);
            if(i === -1){
                data.push({name: studentName, score1: score1, score2: score2, total: parseInt(calculateTotal(score1 , score2))});
            }else {
                response.send('exists');
            }
        }
    }else {
        response.send("fail");
    }
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
});

app.listen(port);
//console.log('server listening on port 3000')
console.log(`server listening on port ${port}`);
