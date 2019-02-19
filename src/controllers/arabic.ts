import { Request, Response } from "restify";
import * as model from "../models/arabic";
import RomanNums from "../utils/RomanNums";

export const getNumber = async (req: Request, res: Response) => {
    const number = req.params.number.toUpperCase();

    if (!number || !isRomanNumber(number)) {
        res.send(400);
    }

    res.send(200, {
        inputValue: number,
        convertedNum: await model.toArabic(number)
    });
};

const isRomanNumber = (number: string) => {
    return !number.split("").some(letter => !RomanNums.includes(letter));
};