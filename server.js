// const express = require('express');
const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config/.env` });

const app = express();

// db connection
mongoose
	.connect("mongodb+srv://zainarfeen87:XNyh5tjYgOKY4MBT@sample.fh9zpdj.mongodb.net/", {
		useNewUrlParser: true
	})
	.then(() => console.log("DB Connected"))
	.catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());

/**
 *morgan running in dev mode
 */
app.use(morgan("dev"));

// equivalent to body-parser
app.use(express.json());

// route midlleware
/**
 * @desc auto loads all routes from the /routes folder
 * @param string './routes
 * @return  forEach is used as sideEffect
 */
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server connected at port: ${PORT}`);
});
