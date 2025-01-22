const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const DATA_FILE = "./tasks.json";

// Middleware
app.use(cors());  // Allow requests from frontend
app.use(bodyParser.json()); // Parse JSON body

// Initialize tasks.json if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Read tasks
app.get("/tasks", (req, res) => {
  const data = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(data));
});

// Create a task
app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));
  res.status(201).json(newTask);
});

// Utility function to get local IP
function getLocalIP() {
  const { networkInterfaces } = require("os");
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;  // Returns the first local IP found
      }
    }
  }
  return "localhost";  // Fallback
}

// Server start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running at http://${getLocalIP()}:${PORT}`);
});