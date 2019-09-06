const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
/* ATTENTION !!
/* data[i++]
/* ++ est acté après l'affichage
/* affiche data[i] puis incremente i
/* ++ est acté avant l'affichage
/*  incremente i puis affiche data[i] de i+1
*/

$(document).ready(() => {
    // test();
})

const randDat = (dat) => {
    for(let i=0; i<dat.length; i++){
        i2 = Math.floor(Math.random() * dat.length)
        swap(i2, i)
    }
    return dat
}

/**
 * swap values
 * @param {int} a 
 * @param {int} b 
 */
const swap = (a, b) => {
    temp = data[b]
    data[b] = data[a]
    data[a] = temp
}

/**
 * Insertion sort
 * @param { [] } dat Array to sort
 */
const insertion = (dat) => {
    nbExec = 0
    for (let i = 0; i < dat.length; i++) {
        console.log(dat.length)
        console.log(i)
        for (k = i; k > 0; k--) {
            if (dat[k] < dat[k - 1]){
                console.log(k)
                nbExec += 1
                swap(k, k - 1)
            }
        }
    }
    console.log("insertion execution : " + nbExec + "\n")
    return dat
}

/**
 * selection sort
 * @param { [] } dat Array to sort
 */
const selection = (dat) => {
    nbExec = 0
    for (i = 0; i < dat.length; i++) {
        for (j = i + 1; j < dat.length; j++) {
            if(dat[j] < dat[i]){
                nbExec += 1
                swap(i, j)
            }
        }
    }
    console.log("selection execution : " + nbExec + "\n")
    return dat
}

/**
 * bubble sort
 * @param { [] } dat 
 */
const bubble = (dat) => {
    nbExec = 0
    for (let i = 0; i < dat.length; i++) {
        for(let j = 0; j < dat.length; j++){
            if(dat[j+1] < dat[j]) {
                nbExec += 1
                swap(j, j+1)
            }
        }
    }
    console.log("selection execution : " + nbExec + "\n")
    return dat
}




const shell = (dat) => {
    nbExec = 0
    
    nbExec += 1

    console.log("shell execution : " + nbExec + "\n")
    return dat
}



/**
 * generic sort
 * @param {[]} randData 
 */
const tri = (randData) => {
    nbExec = 0
    //in action sort
    nbExec += 1
    //out
    console.log("selection tri : " + nbExec + "\n")
    return randData
}

const test = () => {
    i=0
    while(i<4){
        // console.log("i++ "+dat[i++])
        console.log("i+1 "+dat[i++])
        // console.log("++i " +data[++i])
    }
}


// const fusion = (randData) => {
//     lengthToSort = randData.length / 2
//     fusion(randData)
// }