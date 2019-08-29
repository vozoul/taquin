/* ======================================================= *\
            Initial variables
\* ======================================================= */

let side = 4 // taille du plateau de jeu (4 x 4) taille de base
let caseVide // coodinates of empty tile
let value = 0 // valeur initiale
let board // initialisation du plateau
let initialBoard // board reference
let lineDom = [] // initialisation du plateau du DOM
let cible = 0


$(document).ready(function () {
    interface()
    makeBoard();
    drawBoard(board);

    $('body').on("click", '.tile', (evt) => {
        const tile = parseInt(evt.currentTarget.textContent)
        console.log(tile)
        move(tile)
        drawBoard(board)
    })

    $('#interface').on("click", 'div>p#randomise', (evt) => {
        boardRandom(board)
        drawBoard(board)
    })
})

/* ======================================================= *\
            Functions (move and construction)
\* ======================================================= */

/**
 * Board construction
 */
const makeBoard = () => {
    newBoard = []
    for (let li = 0; li < side; li++) {
        newBoard.push([]) // add line on board
        for (let co = 0; co < side; co++) {
            if ((value + 1) < (side * side)) {
                value += 1
            } else {
                value = 0
                caseVide = [li, co] // define empty tile coordinate
            }
            newBoard[li].push(value) // add column and tile value 
        }
    }
    initialBoard = newBoard
    board = newBoard
}

/**
 * move tile
 * @param { [x, y] } tile table of tile coordinate
 */
const move = (tile) => {
    lineDom = []
    $('#app').empty()
    swap(getTilePos(tile))
}


/**
 * check if action is done
 * @return true | false
 */
const isSwapable = (dest, source = caseVide) => {
    
    const isInside = (dest[0] >= 0 || dest[0] < side) && (dest[1] >= 0 || dest[1] < side)
    const diffx = Math.abs(source[0] - dest[0])
    const diffy = Math.abs(source[1] - dest[1])
    const nextTo = (diffx + diffy) === 1

    if (nextTo && isInside) {
        return true
    }
    return false
}

/**
 * Swap tile even is possible
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


/**
 * Get tile value on click and return coordinates
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


/**
 * Blend of the game board randomly
 * @param { [][] } board bi-dimensional table
 */
const boardRandom = (boardIn) => {
    playable = false

    for (let li = 0; li < side; li++) {
        for (let co = 0; co < side; co++) {
            let li1 = randomising()
            let co1 = randomising()

            //permutation
            temp = boardIn[li][co]
            boardIn[li][co] = boardIn[li1][co1]
            boardIn[li1][co1] = temp
        }
    }

    testBoard(boardIn)

    board = boardIn


}

/**
 * Random number according side
 */
function randomising() {
    return Math.floor(Math.random() * side)
}

const testBoard = (nextBoard) => {
    let arrayCheck = []

    for (li = 0; li < side; li++) {
        for (co = 0; co < side; co++) {
            arrayCheck.push(boardIn[li][co])
        }
    }
    caseVide = getTilePos(0)
}

/* ======================================================= *\
                Functions (darwing)
\* ======================================================= */

/**
 * make the interface app
 */
const interface = () => {
    let bloc = document.createElement('div')
    let button = document.createElement('p')
    button.setAttribute("id", "randomise")
    button.textContent = "randomise"
    $(button).appendTo(bloc)
    $(bloc).appendTo($('#interface'))
}

/**
 * Dessine le plateau de jeu sur le DOM
 * @param { [] } board le plateau de jeu
 */
const drawBoard = (board) => {
    lineDom = []
    $('#app').empty()
    board.forEach((items) => {
        lineInput = document.createElement('div') // creation de la ligne pour le DOM
        lineInput.setAttribute("class", 'line') // ajout de l'attribut class
        items.forEach((value) => {
            let input = document.createElement('div') // creation de la slide du DOM
            // ajout des Attributs & Valeur
            input.setAttribute("class", "tile " + ((value === 0) ? "vide" : ""))
            input.setAttribute("style", "{ width: calc(100%/" + side + "); padding: 5}")
            input.setAttribute("id", value)
            input.setAttribute("value", value)
            input.textContent = (value !== (side * side)) ? value : 0;
            lineInput.appendChild(input) // ajout de la slide dans la ligne du DOM

        })
        lineDom.push(lineInput)
    })
    lineDom.forEach(slide => {
        $(slide).appendTo($('#app'))
    })
}

/**
 * Switch DOM elements
 * @param { int } value 
 */
const switchDom = (value) => {
    console.log(value)
    $('div#' + value).setAttribute("id", value)
    $('div#' + value).setAttribute("value", value)
    input.textContent = value;
}

/* ==================================================== *\
    Clement Shuffle && Check board playable
    it's an example to put the functionality
    in app
\* ==================================================== */

/**
 * Blend of the game board randomly and check playability
 * @param { [][] } board // bi-dimensional table
 * @param { int } dim size of board side
 * @param { int } size // graphicale used value
 * @param { int } margin // graphical used value
 */
function shuffleboard(board, dim, size, margin) {
    //board = game board
    //dim = side
    //size, margin => for graphical use

    // shuffle bi-dimensionnal board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let i1 = Math.floor(Math.random() * (board.length));
            let j1 = Math.floor(Math.random() * (board.length));

            // in shuffle swap tiles
            let temp = board[i][j];
            board[i][j] = board[i1][j1];
            board[i1][j1] = temp;
        }
    }

    // init a check table
    var arrayCheck = [];

    // put in check table all values
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            arrayCheck.push(board[i][j]);
        }
    }

    // get empty coordonate
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 16) {
                var caseVideLigne = i;
                var caseVideColonne = j;
            }
        }
    }


    var nbPermutationCaseVide = ((dim - 1) * 2) - (caseVideLigne + caseVideColonne);
    
    
    var evenOrtNot = checkNumberPermuation(arrayCheck);
    if ((nbPermutationCaseVide % 2 === 0 && evenOrtNot % 2 === 0) || (nbPermutationCaseVide % 2 !== 0 && evenOrtNot % 2 !== 0)) {
    } else {
        shuffleboard(board, dim, size, margin);
        var blankBoard = $('#container-a-example').find("div");
        blankBoard.remove();
        drawBlocks($('#container-a-example'), dim, size, margin, board);
    }
    return board;
}

function checkNumberPermuation(arrayCheck) {
    var test = 0;
    for (let i = 0; i < arrayCheck.length; i++) {
        if (arrayCheck[i] !== i + 1) {
            for (let j = 0; j < arrayCheck.length; j++) {
                if (arrayCheck[j] === i + 1) {
                    test++;
                    var temp = arrayCheck[i];
                    arrayCheck[i] = arrayCheck[j];
                    arrayCheck[j] = temp;
                }
            }
        }
    }
    return test;
}
