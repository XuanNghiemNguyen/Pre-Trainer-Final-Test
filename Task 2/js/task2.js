var n;
var m;
setInterval(
    function () {
        document.querySelector(".y").innerHTML = document.getElementById("numRows").value;
        document.querySelector(".x").innerHTML = document.getElementById("numCols").value;
    }, 0);
function createInt() {
    return Math.floor((Math.random() * 1000) + 1);
}
function start() {
    n = parseInt(document.querySelector(".y").innerHTML = document.getElementById("numRows").value);
    m = parseInt(document.querySelector(".x").innerHTML = document.getElementById("numCols").value);
    let header = ``;
    let content = ``;
    for (let i = 0; i < m; i++) {
        header += `<th class="headClick" >${i}</th>`;
    }
    let count = 0;
    for (let i = 0; i < n; i++) {
        content += `<tr>`;
        for (let j = 0; j < m; j++) {
            content += `<td class="contentX" id="${count++}">${createInt()}</td>`;
        }
        content += `</tr>`;
    }
    document.querySelector(".title").innerHTML = header;
    document.querySelector(".content").innerHTML = content;

    function sortTableByCol(e) {
        let val = parseInt(this.innerHTML);
        var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        var table = document.getElementById("neSort");
        switching = true;
        dir = "asc";
        while (switching) {
            rows = table.rows;
            switching = false;
            for (i = 1; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("td")[val].innerHTML;
                y = rows[i + 1].getElementsByTagName("td")[val].innerHTML;
                shouldSwitch = false;
                if (dir == "asc") {
                    if (parseInt(x) > parseInt(y)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (parseInt(x) < parseInt(y)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switchcount++;
                switching = true;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    switching = true;
                    dir = "desc";
                }
            }
        }
    }
    const headEvent = document.querySelectorAll(".headClick");
    headEvent.forEach(item => {
        item.addEventListener("click", sortTableByCol)
    })
}
