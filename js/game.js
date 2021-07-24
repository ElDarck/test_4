window.onload = function () {
    let newGame = document.getElementById('again');
    let turn = 0;
    let cell = document.getElementsByClassName('cell');
    let mes = document.getElementById('massage');
    let dataX = [];
    let dataO = [];
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let p =0; p < cell.length; p++) {
        cell[p].addEventListener('click', play);
    }

    function play(event) {
        let num = +this.getAttribute('data-cell');
        if (event.target.className === 'cell') {
             if (event.target.innerHTML !== 'X' && event.target.innerHTML !=='O' ) {
                 if (turn % 2 === 0) {
                    event.target.innerHTML = 'X';
                    dataX.push(num);
                    document.getElementById('massage').innerText = 'Ходит игрок: Игрок 2';
                    if (dataX.length > 2 && winnerCheck(dataX, num)) {
                       for (let p =0; p < cell.length; p++) {
                         cell[p].removeEventListener('click', play);
                       }
                        return ( mes.innerText = 'Победил ХЭ');
                    }

                 } else {
                    event.target.innerHTML = 'O';
                    dataO.push(num);
                    document.getElementById('massage').innerText = 'Ходит игрок: Игрок 1';
                     if (dataX.length > 2 && winnerCheck(dataO, num)) {
                         for (let p =0; p < cell.length; p++) {
                             cell[p].removeEventListener('click', play);
                         }
                         return ( mes.innerText = 'Победил Ноль');
                     }
                 }
                turn++;
                 (turn === 9) ? (mes.innerText = 'Friendship. Friendship again??') : ('');
            }
        }
    }

    function winnerCheck (arr) {
        for (let i = 0; i < combs.length; i++) {
            let winArr = combs[i];
            let count = 0;
            for (let z = 0; z < winArr.length; z++) {
                if (arr.indexOf(winArr[z]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
        }
    }

    newGame.addEventListener('click', function () {
        for (let p = 0; p < cell.length; p++) {
            cell[p].innerHTML = '';
            cell[p].innerText = '';
            turn = 0;
            dataX = [];
            dataO = [];
            mes.innerText = 'Ходит игрок: Игрок 1';
            for (let p =0; p < cell.length; p++) {
                cell[p].addEventListener('click', play);
            }
        }
    })

}
