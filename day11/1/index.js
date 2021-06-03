function fib(number) {
    if (number <= 2) {
        return 1;
    } else {
        return fib(number - 1) + fib(number - 2);
    }
};

var result;

function getFib(number){
    return new Promise((resolve,reject)=>{
        result = fib(number);
        if(result){
            resolve(result);
        }else{
            reject('Error');
        }
    });
}

console.log("1. starting");
getFib(40).then((value)=>{console.log(value)})
console.log("3. finished");