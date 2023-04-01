const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = 'scores.json';

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

// This is a RESTful POST web service
app.post('/process_scores', jsonParser, (request, response) => {
    const studentName = request.body.name;
    const score1 = request.body.score1;
    const score2 = request.body.score2;
    var total;
    if(studentName != null || Number.isInteger(score1) || Number.isInteger(score2)) {
        if(studentName){
            const i = data.findIndex(scores => scores.name === studentName);
            if(i === -1){
                function calculateTotal() {
                    total = (score1 + score2);
                    return total;
                }
                data.push({name: studentName, score1: score1, score2: score2, total: calculateTotal()});
                response.send('success');
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
console.log('server listening on port 3000');