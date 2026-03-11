

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const max = Math.max(...arr1)
console.log("max:", max)

let str1 = "Hello World"
let reverseStr = str1.split("").reverse().join("")
console.log("reversed string:", reverseStr)

let arr2 = [1, 2, 3, 4, 5, 3, 4]
let uniqueArr = [...new Set(arr2)]
console.log("unique array:", uniqueArr)

let str2 = "madam"
let palindromeCheck = str2 === str2.split("").reverse().join("")
console.log("is palindrome:", palindromeCheck)

let flatArr = [1, 2, [4, 6, [7, 3]]]
console.log("flattened array:", flatArr.flat(3))

var a = 5

function test() {
    console.log(a);
    var a = 10;
}
var a = 7
var a = 8
test();
console.log(a)