function doSomething(callback) {
    console.log("Do Something");

    setTimeout(function() {
        console.log("Something is done");
        callback();
    }, 1000);
}

function finished() {
    console.log("The callback function was executed");
}

doSomething(finished);
console.log("This line runs before callback")


function doSomething1(callback) {
    console.log("Do something");
    
    setTimeout(function() {
        console.log("Something is done");
    }, 1000);
}

function finished1() {
    console.log("The callback function was executed")
}

doSomething1(finished1);
console.log("This line runs before callback");