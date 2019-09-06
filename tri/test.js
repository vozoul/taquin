function DFS(p, m) {
    if (p == m) {
        return false
    }
    if (isWinning()) {
        return true
    }
    const coupsPossibles = rules(board);
    for (let i = 0; i < coupsPossibles.length; i++) {
        const caseVide = [ligne, colonne];
        move(coupsPossibles[i]);
        render();
        if (DFS(p + 1, m)) {
            return true
        }
        move(caseVide);
    }
    return false
}

function resolve() {
    if (DFS(0, 10)) {
        console.log('gagné')
    } else {
        console.log('perdu')
    }
}


/**
 *


 Le tri de Shell ou Shell Sort en anglais est un algorithme de tri.

 C'est une amélioration notable du tri par insertion.

 Il est facile de comprendre intuitivement comment fonctionne cet algorithme

 mais il est difficile de calculer son temps d'exécution.

 Le tri de Shell est une amélioration du tri par insertion en observant deux choses:

 Le tri par insertion est efficace si la liste est à peu près triée.

 Le tri par insertion est inefficace en moyenne car il ne déplace les valeurs que d'une position par instruction.

 Le tri de Shell trie chaque liste d'éléments séparés de n positions chacun avec le tri par insertion.

 L'algorithme effectue plusieurs fois cette opération en diminuant n jusqu'à n=1 ce qui équivaut à trier tous les éléments ensemble.

 Le fait de commencer avec des éléments espacés permet de pallier à l'inconvénient,

 tandis que lorsque l'on fait à la fin avec un espacement de 1, ce qui est en fait un tri par insertion ordinaire, on tire parti de l'avantage.

 */

Array.prototype.sortS = function (cf) {
    this.cf = typeof cf != 'undefined' ? cf : function (e1, e2) { return e1 < e2 ? -1 : e1 == e2 ? 0 : 1; };
    /*


 gaps[] doit approximer une Série géométrique.

 La sequence suivante est la meilleure connue en terme

 de nombre moyen de comparaisons. voir:

 http://www.research.att.com/~njas/sequences/A102549

*/

    var gaps = [1, 4, 10, 23, 57, 132, 301, 701];

    for (var sizeIndex = gaps.length - 1; sizeIndex >= 0; --sizeIndex) {
        var gap = gaps[sizeIndex];
        for (var i = gap; i < this.length; ++i) {
            var value = this[i];
            for (var j = i - gap; j >= 0 && this.cf(this[j], value) > 0; j -= gap) {
                this[j + gap] = this[j];
            }
            this[j + gap] = value;
        }
    }
    return this;
}












function shellSort(arr) {
    let increment = arr.length / 2; // increment is arbitrary
    while (increment >= 1) {
        for (let startIndex = 0; startIndex < increment; startIndex++) {
            insertionSort(arr, startIndex, increment);
        }

        increment = Math.floor(increment / 2);
    }
}

function insertionSort(arr, startIndex, increment) {
    for (let i = startIndex; i < increment; i++) {
        let sortedListLastIndex = i;
        for (let j = i + increment; j < arr.length; j += increment) {
            const current = arr[j];
            let currentIndex = j;
            let swapIndex = sortedListLastIndex;
            while (current < arr[swapIndex] && swapIndex >= 0) {
                swap(arr, currentIndex, swapIndex);
                currentIndex -= increment;
                swapIndex -= increment;
            }
            sortedListLastIndex += increment;
        }
    }
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}




function shellsort() {
    let increment = 8;
    while (increment >= 1) {
        let start = 0;
        let decalage = Math.ceil(csvData.length / increment);
        let end = decalage;
        while (start < csvData.length) {
            let temp = csvData.slice(start, end);
            for (let i = 0; i < temp.length; i++) {
                var j = i - 1;
                while (j >= 0 && isLess(j + 1 + start, j + start)) {
                    swap(j + start, j + 1 + start);
                    j--;
                }
            }
            start += decalage;
            end += decalage;
        }
        increment = Math.floor(increment / 2);
    }
}



//initialisation de l'incrementation division de mon tableau principale
let inc = 8

while (inc >= 1) { // tant que mon inc est superieure ou egale a 1
    console.log("inc" + inc)
    let init = 0 //j'initialise la valuer de depart
    let decal = Math.ceil(csvData.length / inc) //je definit le decalage
    end = decal
    while (init < csvData.length) {
        console.log("ends : " + end)
        let tmp = csvData.slice(init, end)
        for (let i = 0; i < tmp.length; i++) {
            for (j = i - 1; j >= 0 && isLess(j + 1 + init, j + init); j--) {
                swap(j + init, j + 1 + init)
            }
        }
        init += decal
        end += decal
    }
    inc = Math.floor(inc / 2)
}