

// // // // let arr = [1, 2, 3, 4, 4, 5, 5, 6];
// // // let arr = (" Gyangyan")
// // // const unique = arr => [...new Set(arr)];
// // // console.log(unique(arr));


// // function missing(arr, n) {
// //     let total = (n * (n + 1)) / 2;
// //     let sum = arr.reduce((a, b) => a + b, 0);
// //     return total - sum;

// // }

// let str = "Gyangyan"
// let reverse = str.split("").reverse().join("");
// console.log(reverse);

let arr = [1, 2, 3, 4, 5, 2, 3, 4, 5];
let unique = [...new Set(arr)];
console.log(unique);