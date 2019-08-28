let side = 4 // taille du plateau de jeu (4 x 4) taille de base
let caseVide
let value = 0 // valeur initiale
let board // initialisation du plateau
let initialBoard
let lineDom = [] // initialisation du plateau du DOM
let cible = 0


/**
 * Une fois que le DOM est chager
 */
$(document).ready(function () {

    makeBoard();
    drawBoard(board);

    $('body').on("click", '.tile', (evt) => {
        const tile = parseInt(evt.currentTarget.textContent)
        move(tile)
        drawBoard(board)
    })


})

/**
 * Construit le plateau de jeu
 */
const makeBoard = () => {
    newBoard = []
    for (let li = 0; li < side; li++) {
        newBoard.push([]) // initialisation d'une ligne sur le plateau de jeu
        for (let co = 0; co < side; co++) {
            if ((value + 1) < (side * side)) {
                value += 1
            } else {
                value = 0
                caseVide = [li, co] // definit le x,y de la case vide
            }
            newBoard[li].push(value)
        }
    }
    initialBoard = newBoard
    board = newBoard
}

/**
 * 
 * @param {*} index 
 */
function move(tile) {
    lineDom = []
    $('#app').empty()
    // fn move kev ici
    swap(getTilePos(tile))
}

/**
 * Dessine le plateau de jeu sur le DOM
 * @param { [] } board le plateau de jeu
 */
const drawBoard = (board) => {
    board.forEach((items) => {
        lineInput = document.createElement('div') // creation de la ligne pour le DOM
        lineInput.setAttribute("class", 'line') // ajout de l'attribut class
        items.forEach((value) => {
            let input = document.createElement('div') // creation de la slide du DOM
            // ajout des Attributs & Valeur
            input.setAttribute("class", "tile " + ((value === 0) ? "vide" :""))
            input.setAttribute("id", value)
            input.setAttribute("value", value)
            input.textContent = (value !== 0) ? value : 0;
            lineInput.appendChild(input) // ajout de la slide dans la ligne du DOM

        })
        lineDom.push(lineInput)
    })
    lineDom.forEach(slide => {
        $(slide).appendTo($('#app'))
    })
}

/**
 * Coups jouable VRAI | FAUX
 */
const isSwapable = (dest, source = caseVide) => {
    
    const isInside = (dest[0] >= 0 || dest[0] < side) && (dest[1] >= 0 || dest[1] < side)

    const destx = Math.abs(source[0] - dest[0])
    const desty = Math.abs(source[1] - dest[1])
    const nextTo = (destx + desty) === 1

    if (nextTo && isInside) {
        return true
    }

    return false
}

/**
 * Joue le coup destination
 * @param { [x,y] } dest tableau de coordonnées x,y
 */
// function move(){
const swap = (dest) => {
    // if( st)){
    if (isSwapable(dest)) {
        const cible = board[dest[0]][dest[1]]
        board[dest[0]][dest[1]] = 0
        board[caseVide[0]][caseVide[1]] = cible
        caseVide = dest
    }
}

const switchDom = (value) => {
    console.log(value)
    $('div#' + value).setAttribute("id", value)
    $('div#' + value).setAttribute("value", value)
    input.textContent = value;
}


/**
 * recupère la valeur de ma tuile au click du joueur
 * @param { int } value
 * @return [x , y]
 */
const getTilePos = (value) => {
    // Parcour le tableau pour retourner les coordonnées de ma case
    for (li = 0; li < side; li++) {
        for (co = 0; co < side; co++) {
            tile = board[li][co]
            if (tile === value) {
                dest = [li, co]
            }
        }
    }
    return dest
}




























// // ===============================================================================================================================
// /**
//  * Mélange du plateau de jeu aléatoirement
//  * @param {*} board le plateau de jeu en cours
//  */
// function boardRandom(board) {
//     for (let i = 0; i < (side * side); i++) {
//         ls = randomising() // prend une ligne aléatoire pour source
//         cs = randomising() // prend une colonne aléatoire pour source
//         ld = randomising() // prend une ligne aléatoire pour destination
//         cd = randomising()  // prend une colonne aléatoire pour destination

//         //permutation
//         temp = board[ls][cs]
//         board[ls][cs] = board[ld][cd]
//         board[ld][cd] = temp
//     }
//     return board
// }

// /**
//  * Nombre aléatoire en fonction de mon side
//  */
// function randomising() {


//     /* ================================== *\
//      */   Math.floor(Math.random() * MAX)
//     /* ================================== *\
//      */



//     return Math.floor(Math.random() * side)
// }




























/*
    line DOM

    slide DOM

    Draw DOM

    // Insertion du plateau de jeu au DOM
    console.log(board)
*/