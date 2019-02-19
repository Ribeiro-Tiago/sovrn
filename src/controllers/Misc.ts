import { Request, Response } from "restify";

import { removeAll } from "../utils/Db";
import { fetchAll } from "../models/Misc";

export const getNumbers = async (req: Request, res: Response) => {
    const type = req.params.numeralType.toLowerCase();

    if (type !== "arabics" && type !== "romans") {
        res.send(400);
    }

    res.send(200, await fetchAll(type));
};

export const deleteAll = async (_req: Request, res: Response) => res.send(200, await removeAll());