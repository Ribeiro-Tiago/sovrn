import { Request, Response } from "restify";

import { toRoman } from "../models/Roman";

/**
 * returns:
 * - 400 if the input isn't valid
 * - 500 if there was an error with the db connection
 * - 200 with the result if everything went oks
 */
export const getNumber = async (req: Request, res: Response) => {
    const { number } = req.params;

    if (!number || isNaN(number) || number <= 0) {
        res.send(400);
    }

    try {
        res.send(200, {
            inputValue: number,
            convertedNum: await toRoman(number)
        });
    } catch (err) {
        res.send(500);
    }
};