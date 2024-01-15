// Imported frameworks
const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
/* Mongo sanitize es para que no nos metan codigo en nuestra pagina */
const mongoSanitize = require("express-mongo-sanitize");
// Componentes nuestros
const connection = require("./utils/db");
const HTTPSTATUSCODE = require("./utils/httpStatusCode");

//Rutas importadas
const moviesRoutes = require("./src/api/routes/movies.routes");
const cinemasRoutes = require("./src/api/routes/cinemas.routes");
const userRoutes = require('./src/api/routes/user.routes')

connection();
const app = express();

app.use(mongoSanitize());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methos", "GET-PUT-POST-DELETE");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Cpntent-Type");
	next();
});
app.use(
	cors({
		origin: ["http://localhost:3000/", "http://localhost:4200/"],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "NodeRestApi");

/* RUTAS */
app.use("/api/movies", moviesRoutes);
app.use("/api/cinemas", cinemasRoutes);
app.use('/api/users', userRoutes)


app.listen(process.env.PORT, () => {
	console.log("LISTEN ACTIVADO");
});
