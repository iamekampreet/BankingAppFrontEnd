const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.use((req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
