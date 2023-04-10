var studentName;
var scoreOne;
var scoreTwo;
var total;

async function fetchScores() {
    const url = '/scores';
    const options = {
        method: 'GET',
        headers: { 
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const rows = await response.json();
    populateContent(rows);
}

async function fetchMedian() {
    const url = '/median';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }

    const response = await fetch(url, options);
    const median = await response.json();
    document.getElementById('median').innerHTML = median;
}

async function fetchAverage() {
    const url = '/average';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }

    const response = await fetch(url, options);
    const average = await response.json();
    document.getElementById('average').innerHTML = average;
}

async function addStudentScores() {
    const url = '/process_scores';
    const scores = {name: studentName, score1: scoreOne, score2: scoreTwo};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(scores)
    }
    const response = await fetch(url, options);

    text = await(response.text())
    if(text == "fail"){
        alert("Scores have to be a number");
    }
    if(text =="exists"){
        alert("Student name already exists");
    }
    fetchMedian();
    fetchAverage();
}

function populateContent(rows) {
    var header = document.getElementById('head');
    var table = document.getElementById('content');
    header.innerHTML = "<tr><th>#</th><th>Student Name</th><th>Quiz 1</th><th>Quiz 2</th><th>Total (Percentage)</th></tr>"
    var numID = 1;
    rows.forEach(row => {
        var tuple = document.createElement('tr');
        var id = document.createElement('td');
        var idText = document.createTextNode(numID);
        var data1 = document.createElement('td');
        var nameText = document.createTextNode(row.name);
        var data2 = document.createElement('td');
        var score1Text = document.createTextNode(row.score1);
        var data3 = document.createElement('td');
        var score2Text = document.createTextNode(row.score2);
        var data4 = document.createElement('td');
        var totalText = document.createTextNode(row.total);
        id.appendChild(idText);
        data1.appendChild(nameText);
        data2.appendChild(score1Text);
        data3.appendChild(score2Text);
        data4.appendChild(totalText);
        tuple.appendChild(id);
        tuple.appendChild(data1);
        tuple.appendChild(data2);
        tuple.appendChild(data3);
        tuple.appendChild(data4);
        table.appendChild(tuple);
        numID++;
    });
}

document.querySelector('form').addEventListener('submit', (e) => {
    studentName = document.getElementById('studentName').value;
    scoreOne = document.getElementById('score1').value;
    scoreTwo = document.getElementById('score2').value;
    if (studentName && scoreOne && scoreTwo) {
        scoreOne = parseInt(scoreOne);
        scoreTwo = parseInt(scoreTwo);
        addStudentScores();
        $("#content").html('');
        fetchScores()
    }
    e.preventDefault();
});

fetchMedian();
fetchAverage();