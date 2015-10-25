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

console.log("--- stop ---");