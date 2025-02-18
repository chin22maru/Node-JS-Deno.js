### Streams & Buffers in Incoming Requests (Short Explanation)
- Buffer → Temporary memory storage for binary data.
- Stream → Handles data chunk by chunk instead of loading everything at once.
### How It Works in Node.js Server
- Client sends data (JSON, file, etc.).
- Server receives data in chunks (Stream).
- Each chunk is stored in a buffer.
- When all data is received, the server processes it.