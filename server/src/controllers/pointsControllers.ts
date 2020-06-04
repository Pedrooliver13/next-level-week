import { Request, Response } from "express";
import knex from "../database/connection"; // pegando o banco de dados; (como se fosse o model);

// quando o typescripts reclama que ele não reconhece , precimamos passar os items para ele reconhecer;
// no caso passamos o req, res  para ele entender e funcionar o typescript;

class pointsControllers {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));
    // estamos separando por virgula pra transforma em uma array e podemos usar o **map**
    // trim --> ele tira todos os espaços tanto da direita quanto da esquerda;

    const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

    // whereIn --> vai trazer quando tiver apenas um dos que tiver dentro da comparação;

    return res.json(points);
  }
  
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      logitude,
      city,
      uf,
      items, // items é um array; (portanto , podemos usar o map);
    } = req.body;

    // para ele para a execução quando houver um erro; (é uma promise);
    const trx = await knex.transaction();

    const point = {
      name,
      email,
      whatsapp,
      latitude,
      logitude,
      city,
      uf,
    };

    const insertPoints = await trx("points").insert(point);

    const pointId = insertPoints[0]; // retornando o points;

    // aqui vamos fazer o relacionamento das tabelas; (ta vindo um array);
    const pointsItems = items.map((items_id: number) => {
      return {
        items_id,
        point_id: pointId,
      };
    });

    await trx("points_items").insert(pointsItems);

    await trx.commit(); // ele precisa disso para fazer os incerts quando usar o trx;

    return res.json({ id: pointId, ...point });
  }
}

export default pointsControllers;
