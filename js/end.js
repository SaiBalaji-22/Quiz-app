const username = document.getElementById("username");
const savebtn = document.getElementById("savebtn");
const finalscore = document.getElementById("finalscore");
const recentscore = localStorage.getItem('recentscore');

const highscores = JSON.parse(localStorage.getItem("highscore")) || [];
console.log(highscores);
const max_highscores = 5;

finalscore.innerText = recentscore;

username.addEventListener("keyup", () => {
    savebtn.disabled = !username.value;
})

savescore = (e) => {
    console.log('clicked');
    e.preventDefault();
    const score = {
        score: recentscore,
        name: username.value
    };

    highscores.push(score);

    highscores.sort((a, b) => {
        return b.score - a.score;
    })
    
    highscores.splice(5);

    localStorage.setItem("highscore", JSON.stringify(highscores));
    window.location.assign("/index.html");
    console.log(highscores);
};