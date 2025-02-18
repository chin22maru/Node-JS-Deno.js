# Debugging in Node.js (With Auto-Restart using Nodemon)

## 1. Types of Errors  

| Error Type       | When it Occurs               | Example                  | Solution                 |
|-----------------|-----------------------------|--------------------------|--------------------------|
| **Syntax Error** | Before execution (wrong code syntax) | \`console.log("Hello\` | Fix syntax mistakes |
| **Runtime Error** | During execution (undefined variables, invalid operations) | \`let x = y + 5;\` | Use \`try...catch\` |
| **Logical Error** | Code runs but gives wrong output | \`return (a * b) / 2;\` | Use debugging tools |

---

## 2. Debugging in VS Code  

✔ Use **\`debugger\`** statement to pause execution.  
✔ Open **Run & Debug** (\`Ctrl + Shift + D\`) and create **\`launch.json\`**.  
✔ Set breakpoints, then use **F10 (Step Over)** or **F11 (Step Into)**.  
✔ Use **\`node inspect\`** for debugging in the terminal.  
✔ Use **Chrome DevTools** (\`node --inspect-brk index.js\`).  

---

## 3. Auto-Restart Debugger After Editing (Using Nodemon)  

### 3.1 Install Nodemon  
```bash
npm install -g nodemon
```

### 3.2 Run Node.js App with Nodemon  
```bash
nodemon --inspect app.js
```
✔ Automatically restarts the app on file changes.  
✔ Works with **VS Code Debugger**.  

---

## 4. Debugging with Nodemon in VS Code  

1️⃣ **Open \`launch.json\`** (\`Run & Debug → Add Configuration\`).  
2️⃣ Add the following config for **Nodemon with Debugging**:  

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via Nodemon",
      "runtimeExecutable": "nodemon",
      "program": "\${workspaceFolder}/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

3️⃣ **Start Debugging** (\`F5\`).  
✔ **Auto-restarts** after editing the file.  
✔ Uses **integrated terminal** instead of a separate console.  

---

🚀 **Now, every time you save changes, the debugger restarts automatically!** 🚀  