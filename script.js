// Tabuleiro Vazio

let board = { 
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}

let player = '';        
let playing = false;   
let warning = '';


// Eventos automáticos


// Limpa os dados do jogo
reset();
// Atribui a função reset ao botão na página
document.querySelector(".reset").addEventListener("click", reset);

// Atribui a cada quadrado a função de click identificando onde foi clicado
document.querySelectorAll(".item").forEach(item =>{
    item.addEventListener("click", itemClick);
})



// Funções

function itemClick(evento){
    // Recebe as informações da div que foi clicada atraves do "evento"
    // Intercepta o atributo data-item para comparar com os valores do board
    // Adciona no objeto (board) o player que clicou
    // Executa renderBoard e togglePlayer
    let item = evento.target.getAttribute('data-item');
    if(playing && board[item] === ''){
        board[item] = player;
        renderBoard();
        togglePlayer();
    }
}

function reset(){
    // Limpa os dados do objeto (board)
    // Executa renderBoard e renderInfo
    // Seleciona o próximo player aleatóriamente
    // Torna clicável através do "playing" para iniciar o game.
    warning = '';
    player = Math.floor(Math.random() * 2);
    player = player > 0 ? 'x' : 'o';

    for(let i in board){
        board[i] = '';
    }

    playing = true;

    renderBoard();
    renderInfo();
}


function renderBoard(){
    // Varre o objeto (board) atribuindo o valor (player) de cada propriedade à div correspondente
    // Verifica o status do game (vencedor, empate, nada)
    for(let i in board){
        document.querySelector(`div[data-item=${i}]`).innerHTML = board[i];
    }
    checkGame();
}

function renderInfo(){
    // Seleciona a div "vez" e atribui a ela o próximo player
    // Seleciona a div resultado e atribui a ela o status do game.
    document.querySelector(".vez").innerHTML = player;
    document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer(){
    // Alterna o player
    // Renderiza na tela o próximo player
    player = player === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    // Sempre que a função renderBoard é chamada a checkGame verifica se alguém já ganhou
    // Pausa o jogo caso alguma condição seja satisfeita
    // O jogo é destravado quando clica em reset
    if(checkWinnerFor('x')){
        warning = "O 'x' Venceu!";
        playing = false;
    }else if(checkWinnerFor('o')){
        warning = "o 'o' Venceu!";
        playing = false;
    }else if(isFull()){
        warning = "Deu Empate";
        playing = false;
    }
}

function checkWinnerFor(player){
    // Verifica se o player passado no parametro é o vencedor.
    // Cada item do array "pos" é uma possibilidade de ganho
    // No loop cada item de "pos" é separado em um outro array, "pArray"
    // Em seguida a variável resWon(vencedor) recebe uma função que verifica se
    // Todos os itens do novo array retornam True quando 
    // o item correspondente do board é igual ao jogador passado no parametro
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let i in pos){
        let pArray = pos[i].split(",");
        let resWon = pArray.every(option => board[option] === player);
        if(resWon){
            return true;
        }

    }
    return false;
}

function isFull(){
    for(let i in board){
        if(board[i] === ''){
            return false;
        }
    }
    return true;
}
