import { Request, Response } from "restify";
import * as model from "../models/Roman";

export const getNumber = async (req: Request, res: Response) => {
    const { number } = req.params;

    if (!number || isNaN(number)) {
        res.send(400);
    }

    res.send(200, {
        inputValue: number,
        convertedNum: await model.toRoman(number)
    });
};