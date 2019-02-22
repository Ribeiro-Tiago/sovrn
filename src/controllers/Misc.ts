import { Request, Response } from "restify";

import { removeAll } from "../utils/Db";
import { fetchAll } from "../models/Misc";

/**
 * returns:
 * - 400 if the input isn't valid
 * - 500 if there was an error with the db connection
 * - 200 with the result if everything went oks
 */
export const getAllOfType = async (req: Request, res: Response) => {
    const type = req.params.numeralType.toLowerCase();

    if (type !== "arabics" && type !== "romans") {
        res.send(400);
        return;
    }

    try {
        res.send(200, await fetchAll(type));
    } catch (err) {
        res.send(500);
    }
};

export const deleteAll = async (_req: Request, res: Response) => {
    try {
        await removeAll()
        res.send(200);
    }
    catch (err) {
        res.send(500);
    }
};