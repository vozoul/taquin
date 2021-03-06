/* ======================================================= *\
            Initial variables
\* ======================================================= */

let side = 3 // taille du plateau de jeu (4 x 4) taille de base
let caseVide // coodinates of empty tile
let value = 0 // valeur initiale
let board = [] // initialisation du plateau
let initialBoard = [] // board reference
let lineDom = [] // initialisation du plateau du DOM
let cible = 0
let click = 0


$(document).ready(function () {
    interface()
    makeBoard();
    drawBoard(board);

    $('body').on("click", '.tile', (evt) => {
        const tile = parseInt(evt.currentTarget.textContent)
        click += 1
        move(tile)
        if (isWin()) {
            winner()
            console.log("fini en : " + click + " coups")
        } else {
            drawBoard(board)
        }
    })

    $('#interface').on("click", 'div>p#randomise', (evt) => {
        click = 0
        boardRandom(board)
        drawBoard(board)
    })


    $('#interface').on("click", 'div>p#resolve', (evt) => {
        if (autoSolvDFS(10, 0)) {
            console.log("win")
            winner()
        } else {
            console.log("unSolvable")
            unSolvable()
        }
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
        initialBoard.push([])
        for (let co = 0; co < side; co++) {
            if ((value + 1) < (side * side)) {
                value += 1
            } else {
                value = 0
                caseVide = [li, co] // define empty tile coordinate
            }
            newBoard[li].push(value) // add column and tile value 
            initialBoard[li].push(value) // add column and tile value 
        }
    }
    board = newBoard.slice(0)
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
    for (let li = 0; li < side; li++) {
        for (let co = 0; co < side; co++) {
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

    while (!playable) {
        for (let li = 0; li < side; li++) {
            for (let co = 0; co < side; co++) {
                let li1 = randomising()
                let co1 = randomising()

                temp = boardIn[li][co]
                boardIn[li][co] = boardIn[li1][co1]
                boardIn[li1][co1] = temp
            }
        }
        playable = testBoard(boardIn)
    }
    board = boardIn
}

/**
 * Random number according side
 */
function randomising() {
    return Math.floor(Math.random() * side)
}

/**
 * check if if it is resolvable
 * @param { [] } nextBoard result of randomised board
 */
const testBoard = (nextBoard) => {
    let arrayCheck = []

    for (let li = 0; li < side; li++) {
        for (let co = 0; co < side; co++) {
            arrayCheck.push(nextBoard[li][co])
        }
    }

    caseVide = getTilePos(0)
    let emptyCountSwitch = ((side - 1) * 2 - (caseVide[0] + caseVide[1]))
    let tilesCountSwitch = countSwitch(arrayCheck)

    if ((emptyCountSwitch % 2 === 0 && tilesCountSwitch % 2 === 0) || (emptyCountSwitch % 2 !== 0 && tilesCountSwitch % 2 !== 0)) {
        return true
    }
    return false
}

/**
 * bubble sorting to get number of tiles swaps
 * @param { [] } array to test
 */
const countSwitch = (array) => {
    let swap = true
    let counter = 0
    while (swap) {
        swap = false
        for (i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                counter++
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swap = true
            }
        }
    }
    return counter
}

/**
 * Test if is won
 * sort bubble like
 * @return true | false
 */
const isWin = () => {
    let difference = side * side;
    for (let li = 0; li < side; li++) {
        for (let co = 0; co < side; co++) {
            let pos = jQuery.inArray(initialBoard[li][co], board[li])
            if (pos === co) {
                difference -= 1
            }
        }
    }
    if (difference === 0) {
        return true
    }
    return false
}

/**
 * check for possible moves
 * @return { [] } possibilities array of movable tiles
 */
const possible = (board) => {
    let possibilities = []
    for (let li = 0; li < side; li++) {
        for (let co = 0; co < side; co++) {
            if (isSwapable([li, co])) {
                possibilities.push(board[li][co])
            }
        }
    }
    return possibilities
}

const autoSolvDFS = (max, p) => {
    if (p > max) {
        return false
    }

    if (isWin()) {
        return true
    }

    let possibles = possible(board)

    for (let i = 0; i < possibles.length; i++) {
        move(possibles[i])
        console.log(possibles[i])
        if (autoSolv(max, p + 1)) {
            return true
        }
        move(possibles[i])
    }
    return false
}


//Exemple recursif
const recursif = (maxCoups, p) => {
    //si p < maxCoups
    if (maxCoups === p) { console.log(p) }
    profondeur(maxCoups, p++)
}

// const autoSolvBFS = (board) => {
//     frontier = []
//     frontier.enfiler(board)
//     known = []
//     while (!empty(frontier)) {

//     }
// }

/* ======================================================= *\
                Functions (darwing)
\* ======================================================= */

/**
 * make the interface app
 */
const interface = () => {
    let bloc = document.createElement('div')

    let randomize = document.createElement('p')
    randomize.setAttribute("id", "randomise")
    randomize.setAttribute("class", "button")
    randomize.textContent = "randomise"

    let resolve = document.createElement('p')
    resolve.setAttribute("id", "resolve")
    resolve.setAttribute("class", "button")
    resolve.textContent = "resolve"

    $(bloc).append(randomize, resolve)

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

/**
 * Display win banner
 */
const winner = () => {
    lineDom = []
    $('#app').empty()
    youWin = document.createElement('h1')
    youWin.textContent = "You are the Winner !!!"
    $(youWin).appendTo('#app')
}

/**
 * Display unsolvable banner
 */
const unSolvable = () => {
    lineDom = []
    $('#app').empty()
    youWin = document.createElement('h1')
    youWin.textContent = "Unsolvable Game"
    $(youWin).appendTo('#app')
}