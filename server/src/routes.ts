import express from "express";

import PointsControllers from "../src/controllers/pointsControllers";
import ItemsControllers from "../src/controllers/itemsControllers";

const routes = express.Router();
// passamos o que está dentro do PointsControllers para essa variavel;
const pointsControllers = new PointsControllers(); 
const itemsControllers = new ItemsControllers();

routes.get("/items", itemsControllers.index);
routes.post("/points", pointsControllers.create);

export default routes;


// todo: padrão para controllers: index: listar , show: mostrar unico usuário, update: atualizar, delete