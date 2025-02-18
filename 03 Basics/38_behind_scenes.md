# Node.js Behind the Scenes: How It Works

Node.js is a **single-threaded, non-blocking** runtime that efficiently handles multiple requests using the **event loop** and an internal **worker pool** for heavy tasks. Below is a breakdown of how Node.js works behind the scenes.

---

## 1. Single Thread and Incoming Requests
- Node.js runs on a **single JavaScript thread** but can handle multiple incoming requests concurrently.
- When a request arrives, Node.js processes lightweight tasks (e.g., routing, simple computations) on the main thread.
- For heavy tasks (e.g., file operations, database queries), Node.js delegates work to the **worker pool** in the background.

---

## 2. Event Loop and Callbacks
The **event loop** is the core of Node.js, handling asynchronous operations. It continuously cycles through different phases:

### Phases of the Event Loop:
1. **Timers Phase** → Executes \`setTimeout()\` and \`setInterval()\` callbacks.
2. **Pending Callbacks Phase** → Executes I/O callbacks (e.g., file system, network requests).
3. **Poll Phase** → Retrieves new I/O events and executes callbacks (e.g., reading from a file).
4. **Check Phase** → Executes \`setImmediate()\` callbacks.
5. **Close Callbacks Phase** → Executes callbacks related to closing resources (e.g., \`socket.on('close')\`).
6. **Idle/Prepare (Internal Phase)** → Used internally by Node.js.

---

## 3. Worker Pool and Heavy Lifting
- Some tasks (e.g., file system operations, cryptography, compression) are **CPU-intensive** and cannot run in the event loop.
- These tasks are delegated to **worker threads** in the **libuv worker pool**.
- Once completed, the worker thread **triggers a callback** in the event loop.

### Example of Blocking vs. Non-Blocking Code:
```javascript
const fs = require('fs');

// Blocking Code (Bad for Performance)
const data = fs.readFileSync('file.txt', 'utf-8');
console.log(data);

// Non-Blocking Code (Recommended)
fs.readFile('file.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
console.log("Reading file..."); // This runs immediately
```
✔ **Non-blocking code** prevents the main thread from getting stuck while waiting for I/O operations.

---

## 4. When Does \`process.exit()\` Happen?
- **Node.js exits when all work is done** and there are no pending timers, callbacks, or active I/O operations.
- If there are **no active references** (e.g., no timers, open sockets, or event listeners), \`process.exit(0)\` is triggered automatically.

---

## Summary
✔ **Single thread** handles multiple requests efficiently.  
✔ **Event loop** processes callbacks and non-blocking operations.  
✔ **Worker pool** handles CPU-intensive tasks.  
✔ **Blocking code** can freeze the event loop; prefer **non-blocking methods**.  
✔ **\`process.exit()\`** occurs when there are no remaining tasks.

---