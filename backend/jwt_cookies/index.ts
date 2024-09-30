import express from "express";

// Express setup
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// App
app.get("/", (req, res) => {
    res.send("Hello World!");
});
