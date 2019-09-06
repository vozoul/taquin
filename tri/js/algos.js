// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};

// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    // console.log("distanceFromGrenoble - implement me !");
    // console.log(city)
    var GrenobleLat = 45.166667;
    var GrenobleLong = 5.716667;

    var R = 6371; // metres
    var lat1 = GrenobleLat;
    var lat2 = city.latitude;
    var lon1 = GrenobleLong;
    var lon2 = city.longitude;

    var deltaLat = (lat2 - lat1).toRadians()
    var deltaLong = (lon2 - lon1).toRadians()

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1.toRadians()) * Math.cos(Number(lat2).toRadians()) *
        Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    // console.log("swap - implement me !");
    let temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    // console.log("isLess - implement me !");
    if (csvData[i].dist < csvData[j].dist) {
        return true
    }
    return false
}

function insertsort() {
    // console.log("insertsort - implement me !");
    for (let i = 0; i < csvData.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (j > 0 && isLess(j, j - 1)) {
                swap(j - 1, j);
            }
        }
    }
}

function selectionsort() {
    // console.log("selectionsort - implement me !");
    for (i = 0; i < csvData.length; i++) {
        for (j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i)) {
                swap(i, j)
            }
        }
    }
}

function bubblesort() {
    i = 0
    // console.log("bubblesort - implement me !");
    while (i < csvData.length) {
        j = 0; jMax = csvData.length - i - 1
        while (j < jMax) {
            (isLess(j + 1, j)) ? swap(j, j + 1) && j++ : j++;
        }
        i++
    }
}

function shellsort() {
    // console.log("shellsort - implement me !");
    const gaps = [1, 4, 10, 23, 57, 132, 301, 701];
    let g = gaps.length - 1;
    let gap = gaps[g];

    if (csvData.length > 1600) {
        while (gap < csvData.length) {
            gap = Math.floor(gap * 2.3)
        }
    }

    while (gap >= 1) {
        for (let i = gap; i < csvData.length; i++) {
            let j = i;
            while (j >= gap && isLess(j, j - gap)) {
                swap(j, j - gap);
                j -= gap;
            }
        }
        if (gap > gaps[gaps.length - 1]) {
            gap = Math.floor(gap / 2.3);
        } else {
            g--;
            gap = gaps[g];
        }
    }
}

function mergesort(dat = csvData) {
    // console.log("mergesort - implement me !");
    // arr = []
    // let left = []
    // let right = []
    // if (dat.length === 1) {
    //     return dat
    // }
    // m = Math.floor(dat.length / 2)
    // for(i = 0; i < m && i+m < dat.length; i++) {
    //     left.push(i)
    //     right.push(i+m)
    // }
    // for(k = 0; k < left.length && k < right.length; k++){
    //     if (isLess(right[k], left[k])){
    //         swap(left[k], right[k])
    //         arr.push(left.shift())
    //     }
    //     arr.push(right.shift())
    // }
    // mergesort(arr)
    // // mergesort(left)
    // // mergesort(right)
    // console.log(left, right, arr)
    function triFusion(tab, l, r) {
        if (l < r) {
            let m = Math.floor(l + (r - l) / 2);
            triFusion(tab, l, m);
            triFusion(tab, m + 1, r);
            fusion(tab, l, m, r);
        }
    }
    function fusion(tab, start, mid, end) {
        let start2 = mid + 1;
        if (isLess(mid, start2)) return;
        while (start <= mid && start2 <= end) {
            if (isLess(start, start2)) {
                start++;
            } else {
                let index = start2;
                while (index !== start) {
                    swap(index, index - 1)
                    index--;
                }
                swap(start2, start2);
                start++;
                mid++;
                start2++;
            }
        }
    }
    triFusion(csvData, 0, csvData.length - 1);
}


function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort() {
    sorting = (start, end) => {
        if (start < end) {
            let p = parting(start, end)
            sorting(start, p - 1)
            sorting(p + 1, end)
        }
    }
    parting = (start, end) => {
        let p = Math.floor(Math.random() * (end - start) + start);
        swap(p, end)
        p = end;
        let i = start - 1; let j = start;
        while (j < p) {
            (isLess(p, j)) ? j++ : swap(j++, ++i)
        }
        swap(i + 1, p)
        return i + 1
    }
    sorting(0, csvData.length - 1)
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert': insertsort(); break;
        case 'select': selectionsort(); break;
        case 'bubble': bubblesort(); break;
        case 'shell': shellsort(); break;
        case 'merge': mergesort(); break;
        case 'heap': heapsort(); break;
        case 'quick': quicksort(); break;
        case 'quick3': quick3sort(); break;
        default: throw 'Invalid algorithm ' + algo;
    }
}
