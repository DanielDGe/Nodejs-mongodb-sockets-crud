import express from "express";

//Con esto tendriamos una aplicacion de servidor bastante basica
//Ya que express permite crear un servidor http.
const app = express();

app.use(express.static(__dirname + "/public"));

export default app;