test();

function test() {
    console.log("Hello");
}

console.log(typeof (3 + "gyan"));

console.log("jhj" - 3);
console.log("5" * 3);
console.log("5" % 3)

console.log(false + true);

console.log(null + 1);

console.log(undefined + 1);

console.log([] == true);

console.log(null === undefined);
console.log(typeof undefined)
console.log(typeof null)


console.log([1, 2, 3878] + [4, 5, 6]);

console.log([] + {});

console.log({} + []);

setTimeout(() => {
    console.log("Hello");
}, 0);
Promise.resolve().then(() => {
    console.log("Gyan");
});