function runEndless(callback) {
    console.log("Running endlessly...");
    console.log("I am still running...");

    // starting out asynchronous task in javascript, so this will take time
    setTimeout(function(){
        callback();
    }, 3000);
}

function afterThreeSeconds() {
    console.log("After three seconds, I am tired!");
}

runEndless(afterThreeSeconds);
console.log("I have also drank water during running!");