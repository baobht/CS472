1. Pls answer the following:

```
What is LibUV?
LibUV is a multi-platform C library that provides asynchronous I/O operations. It's used under the hood by Node.js to handle non-blocking operations like file system access, DNS, network requests, and more.

Key features include:
- Event loop
- Asynchronous TCP/UDP sockets
- File system operations
- Child processes
- Thread pool

In Node.js, LibUV powers the event loop and is critical to Node's non-blocking, event-driven architecture.

Explain the difference between setImmediate(f) and setTimeout(f, Time)?
| Aspect     | setImmediate(f)                                 | setTimeout(f, time)                            |
|------------|--------------------------------------------------|-----------------------------------------------|
| Purpose    | Executes f after the current poll phase          | Executes f after at least time milliseconds   |
| Timing     | Typically executes before any I/O timers         | Waits the given time                          |
| Use case   | Run after I/O events (non-blocking tasks)        | Delay execution by specific time              |

Explain the difference between process.nextTick(f) and setImmediate(f)?
| Aspect     | process.nextTick(f)                          | setImmediate(f)                               |
|------------|----------------------------------------------|-----------------------------------------------|
| Timing     | Executes before the event loop continues     | Executes on the next iteration of the loop    |
| Priority   | Higher (executes first)                      | Lower                                         |
| Use case   | Deferring without yielding to event loop     | Deferring after I/O or after event loop phase |
```

2. Pls write down the output without executing the following code snippets and check it with result.

```
const fs = require('fs');

//you may assume input.txt is in the same folder

const rd = fs.createReadStream("input.txt");

rd.close();

rd.on("close", () => console.log('readablStream close event'))

fs.readFile('input.txt', "utf-8", (error, data) => {

    if (error) console.log(error);

    else console.log(data)

});

setTimeout(() => console.log("this is setTimeout"), 5000);

setTimeout(() => console.log("this is setTimeout"), 0);

setImmediate(() => console.log("this is setImmediate 1"));

setImmediate(() => {

    console.log("this is setImmediate 2")

    Promise.resolve().then(() => console.log('Promise.resolve inside setImmediate'));

});

Promise.resolve().then(() => console.log('Promise.resolve 1'));

Promise.resolve().then(() => {

    console.log('Promise.resolve 2')

    process.nextTick(() => console.log('nextTick inside Promise'));

});

process.nextTick(() => console.log('nextTick 1'));
```

```
Answer:
nextTick 1
Promise.resolve 1
Promise.resolve 2
Promise.resolve 3
nextTick inside Promise
this is setTimeout
this is setImmediate 1
this is setImmediate 2
Promise.resolve inside setImmediate
readablStream close event
hello world
this is setTimeout
```
