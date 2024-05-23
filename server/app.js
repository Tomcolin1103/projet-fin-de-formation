const express = require("express");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("Express + Typescript server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost=${port}`);
});
