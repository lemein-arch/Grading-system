const server = 'http://localhost:3000';
var studentName;
var scoreOne;
var scoreTwo;
var total;

async function addStudentScores() {
    const url = server + '/process_scores';
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
    if(text == "success"){
        alert("Scores have been succesfully added for student");
    }
    if(text =="exists"){
        alert("Student name already exists");
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    studentName = document.getElementById('studentName').value;
    scoreOne = document.getElementById('score1').value;
    scoreTwo = document.getElementById('score2').value;
    if (studentName && scoreOne && scoreTwo) {
        scoreOne = parseInt(scoreOne);
        scoreTwo = parseInt(scoreTwo);
        addStudentScores();
    }
    e.preventDefault();
    $('form').get(0).reset(); // or $('form')[0].reset()
});