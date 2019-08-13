
setInterval(
    function (){
        const p1 = document.querySelector(".y").innerHTML=document.getElementById("numWins").value;
        document.querySelector(".x").innerHTML=document.getElementById("size").value;
        document.getElementById("size").min = parseInt(p1);
    }, 0);
function play(){
    const size = parseInt(document.getElementById("size").value);
    const numWins = parseInt(document.getElementById("numWins").value);
    function initBoard() {
        let chess = " ";
        let count = 0;
        for (let i = 0; i < size; i++) {
            chess += `<tr>`;
            for (let j = 0; j < size; j++) {
                chess += `<td class="square" id="${count++}"><img src="images/s0.gif"/></td>`;
            }
            chess += `</tr>`;
        }
        document.querySelector(".board > table > tbody").innerHTML = chess;
        document.querySelector(".player1").innerHTML = `Player 1<img class="arrow" src="images/left_arrow.gif"/>`;
    }
    initBoard();
    
    let square = document.querySelectorAll(".square");
    var x = false;
    
    function arrowAp(luot) {
        if (luot === false) {
            document.querySelector(".player1").innerHTML = `Player 1&nbsp;<img class="arrow" src="images/left_arrow.gif"/>`;
        } else {
            document.querySelector(".player1").innerHTML = `Player 2&nbsp;<img class="arrow" src="images/left_arrow.gif"/>`;
        }
    }
    var matrix = new Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size);
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
    
    function checkIn(e) {
        if (!this.classList.contains("checked")) {
            let player = 0;
            const offsetY = Math.floor(parseInt(this.id) / size);
            const offsetX = parseInt(this.id) % size;
            if (x === false) {
                this.innerHTML = `<img style="cursor: not-allowed;" src="images/s1.gif"/>`;
                this.classList.add("checked");
                x = true;
                arrowAp(x);
                matrix[offsetY][offsetX] = 1;
                player = 1;
            } else {
                this.innerHTML = `<img style="cursor: not-allowed;" src="images/s2.gif"/>`;
                this.classList.add("checked");
                x = false;
                arrowAp(x);
                matrix[offsetY][offsetX] = 2;
                player = 2;
            }
            let p = 1;
            for (let i = 1; i < numWins; i++) {
                if(offsetX===size-1) break;
                if (matrix[offsetY][offsetX + i] === player) {
                    p++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < numWins; i++) {
                if(offsetX===0) break;
                if (matrix[offsetY][offsetX - i] === player) {
                    p++;
                } else {
                    break;
                }
            }
            if (p !== numWins) {
                p = 1;
                for (let i = 1; i < numWins; i++) {
                    if(offsetY+i===size) break;
                    if (matrix[offsetY + i][offsetX] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
                for (let i = 1; i < numWins; i++) {
                    if(offsetY-i<0) break;
                    if (matrix[offsetY - i][offsetX] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
            }
            if (p !== numWins) {
                p = 1;
                for (let i = 1; i < numWins; i++) {
                    if(offsetY + i===size||offsetX+i===size) break;
                    if (matrix[offsetY + i][offsetX + i] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
                for (let i = 1; i < numWins; i++) {
                    if(offsetY-i<0||offsetX-i<0) break;
                    if (matrix[offsetY - i][offsetX - i] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
            }
            if (p !== numWins) {
                p = 1;
                for (let i = 1; i < numWins; i++) {
                    if(offsetY+i===size||offsetX-i<0) break;
                    if (matrix[offsetY + i][offsetX - i] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
                for (let i = 1; i < numWins; i++) {
                    if(offsetY-i<0||offsetX+i===size) break;
                    if (matrix[offsetY - i][offsetX + i] === player) {
                        p++;
                    } else {
                        break;
                    }
                }
            }
            if (p === numWins) setTimeout(function() {
                alert("Player " + player + " has won!");
                p = 1;
                window.location.reload();
            }, 100);
        }
    }
    
    square.forEach(item => item.addEventListener("click", checkIn));
    document.getElementById("start").disabled=true;
}

