const highscorelist = document.getElementById("highscorelist");
const highscores = JSON.parse(localStorage.getItem("highscore")) || [];

highscorelist.innerHTML = highscores.map(score => {
    return `<li class="list">${score.name} - ${score.score}</li>`;
}).join("");