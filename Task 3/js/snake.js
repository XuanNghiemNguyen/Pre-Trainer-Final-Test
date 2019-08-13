var snake = [
    [1, 190]
];
snake.push([2, 1]);
var status = 3;
var apple = 0;
var size = 20; //20*20
var lenSnake = snake.length;
var mode = true;
function initBoard() {
    let str = "";
    let k = 0;
    for (let i = 0; i < size; i++) {
        str += `<tr>`;
        for (let j = 0; j < size; j++) {
            str += `<td class="ele" id="s${k++}"><img class="null_snake" src="images/null.png"></img></td>`;
        }
        str += `</tr>`;
    }
    const matrix = document.querySelector(".matrix").innerHTML = str;
}
initBoard();
function eat() {
    apple = Math.floor(Math.random() * size * size - 1);
    const exception = snake.some(item=>item[1]===apple);
    if(exception) eat();
}
eat(); 

function printSnake() {
    let kao = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (kao === apple) {
                document.querySelector(`#s${kao++}`).innerHTML = `<img class="body_snake" src="images/apple.png"></img>`;
            } else {
                document.querySelector(`#s${kao++}`).innerHTML = `<img class="body_snake" src="images/null.png"></img>`;
            }
        }
    }
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] === 1) {
            document.querySelector(`#s${snake[i][1]}`).innerHTML = `<img class="head_snake" src="images/head.png"></img>`;
        } else if (snake[i][0] === 2) {
            document.querySelector(`#s${snake[i][1]}`).innerHTML = `<img class="body_snake" src="images/body.png"></img>`;
        }
    }
}
function lose(ck) {
    for (let i = snake.length - 1; i > 0; i--) {
        if (snake[i][1] === snake[0][1]) {
            alert("YOU LOSE! Click OK to play again!");
            window.location.reload();
        }
    }
    if (ck===true&&((snake[0][1] % size == 0 && status == 3) || (Math.floor(snake[0][1] / size) < 0 && status == 2) || (Math.floor(snake[0][1] / size) > size - 1 && status == 4) || ((snake[0][1] % size == size - 1 || snake[0][1] % size < 0) && status == 1))) {
        alert("YOU LOSE! Click OK to play again!");
        window.location.reload();
    }
}



function turn() {
    let add = snake[snake.length - 1][1];
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i][1] = snake[i - 1][1];
    }
    if (status == 1) {
        snake[0][1] -= 1;
    } else if (status == 2) {
        snake[0][1] -= size;
    } else if (status == 3) {
        snake[0][1] += 1;
    } else if (status == 4) {
        snake[0][1] += size;
    }
    lose(mode);
    if (snake[0][1] % size == 0 && status == 3) snake[0][1] -= size;
    if (Math.floor(snake[0][1] / size) < 0 && status == 2) snake[0][1] = 21 * size - (size - (snake[0][1] % size));
    if (Math.floor(snake[0][1] / size) > size - 1 && status == 4) snake[0][1] = snake[0][1] % size;
    if ((snake[0][1] % size == size - 1 || snake[0][1] % size < 0) && status == 1) snake[0][1] += size;
    if (snake[0][1] === apple) {
        snake.push([2, add]);
        eat();
    }
    updateScore();
    printSnake();
}

function occ(e) {
    if (e.keyCode === 37 && status != 3 && Math.floor(snake[1][1]/size)!==Math.floor(snake[0][1]/size)) {
        status = 1;
    } else if (e.keyCode === 38 && status != 4 && snake[1][1]%size!==snake[0][1]%size) {
        status = 2;
    } else if (e.keyCode === 39 && status != 1 && Math.floor(snake[1][1]/size)!==Math.floor(snake[0][1]/size)) {
        status = 3;
    } else if (e.keyCode === 40 && status != 2 && snake[1][1]%size!==snake[0][1]%size) {
        status = 4;
    }
}


function updateScore() {
    if (lenSnake < snake.length) {
        lenSnake = snake.length;
        document.querySelector(`.updateScore`).innerHTML = `Score: ${(lenSnake-2)*100}`;
    }
}
var control;
function play(){
    clearInterval(control);
    let ck = document.getElementsByName("Mode");
    mode = ck[0].checked? true:false;
    control = setInterval(turn, 500);
    window.addEventListener("keydown", occ);
}
