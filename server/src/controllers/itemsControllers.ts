import { Request, Response } from "express";
import knex from "../database/connection"; // como se fosse o **db**

class ItemControllers {
  async index(req: Request, res: Response) {
    // pégamos todos os items;
    const items = await knex("item").select("*");

    // aqui transformamos em url, das images separadas;
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image: `${req.protocol}://${req.headers.host}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();
    // está vindo como array,para ele me enviar apenas um colocamos o first(); no final

    if (!point)
      return res.status(400).json({ message: "Aconteceu um erro :(" });

    const items = await knex("items")
      .join("point_items", "items.id", '=', "points_items.items_id")
      .where("point_items.point_items", id);

    /* 
      todo: Como seria fazer a query na mão;
      * SELECT * FROM items
      * LEFT JOIN point_items ON (items.id = point_items.item_id) 
      * WHERE points_items.point_id = ${ id }
    */

    return res.json({ point, items });
  }
}

export default ItemControllers;
