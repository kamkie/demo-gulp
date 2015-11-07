///<reference path='../../typings/tsd.d.ts' />
"use strict";

import http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');

console.log("--- start ---");

class Startup {

    private name;

    constructor(name:String) {
        this.name = name;
    }

    public static main():number {
        console.log('Hello World');
        return 0;
    }

    public hello():void {
        console.log('Hello ' + this.name);
    }
}

var hello = new Startup('world');
hello.hello();
Startup.main();


server.close(() => {
    console.log("--- stop ---");
    process.exit()
});
