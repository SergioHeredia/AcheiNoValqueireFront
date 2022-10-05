
import express from "express";
import { handler } from "./build/handler.js";


import path from 'path';

const __dirname = path.resolve();

const app = express();
const PORT =  3333;

app.get('/', (req, res) => {
    res.sendFile(__dirname);
  });

app.use(handler);

app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});