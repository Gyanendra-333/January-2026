

const promise = new Promise((resolve, reject) => {
    resolve("Success")
});

const promise1 = new Promise((resolve, reject) => {
    reject("Error")
});

promise.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

promise1.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});