# Global & Local npm Packages

## 1. Local Packages  
✔ Installed **inside \`node_modules\` of a project**.  
✔ Defined in \`package.json\` under **\`dependencies\` or \`devDependencies\`**.  
✔ **Not accessible globally** in the terminal.  
✔ **Must run \`npm install\`** to restore after sharing.  

📌 **Install a Local Package:**  
```bash
npm install express
```

---

## 2. Global Packages  
✔ Installed **system-wide**, accessible anywhere.  
✔ Used for **CLI tools** like \`nodemon\`.  
✔ **Not added to \`package.json\`**.  

📌 **Install a Global Package:**  
```bash
npm install -g nodemon
```
📌 **Now, use it anywhere:**  
```bash
nodemon app.js
```

---

## 3. Key Differences  

| Feature        | Local (\`npm install package\`) | Global (\`npm install -g package\`) |
|---------------|------------------------------|----------------------------------|
| Installed In  | \`node_modules\` (project)     | System-wide                     |
| Defined In    | \`package.json\`               | Not in \`package.json\`           |
| Accessible Globally? | ❌ No | ✅ Yes |
| Example Usage | \`node app.js\` | \`nodemon app.js\` |

---

📌 **Use local for project-specific dependencies.**  
📌 **Use global for system-wide CLI tools.**  
