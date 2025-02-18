## 1. Initialization (Startup)
- The Node.js runtime starts.
- The main script (server.js) is loaded and executed.
- Required modules (express, http, fs, etc.) are imported.
- The server is created using http.createServer() or express().
- Routes and middleware are set up.
- The server starts listening on a specified port (app.listen(PORT)).
## 2. Event Loop Execution (Handling Requests)
- The server runs continuously and waits for incoming client requests.
- When a request comes in:
    - The request is parsed.
    - The corresponding route handler is executed.
    - If needed, the server queries a database.
    - A response is generated and sent back to the client.
- The event loop continues running, waiting for more requests.
## 3. Cleanup & Shutdown
- If the server receives a termination signal (Ctrl + C, process.exit(), or a crash):
- Open connections are closed.
- Pending requests are handled.
- Cleanup tasks (e.g., closing database connections) are performed.
- The server shuts down gracefully.
