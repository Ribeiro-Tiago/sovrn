import { Request, Response } from "restify";

import { toArabic } from "../models/Arabic";
import { asRomanArr } from "../utils/RomanNums";

/**
 * returns:
 * - 400 if the input isn't valid
 * - 500 if there was an error with the conversion / db connection
 * - 200 with the result if everything went oks
 */
export const getNumber = async (req: Request, res: Response) => {
    const number = req.params.number.toUpperCase();

    if (!number || !isRomanNumber(number)) {
        res.send(400);
        return;
    }

    try {
        res.send(200, {
            inputValue: number,
            convertedNum: await toArabic(number)
        });
    } catch (err) {
        res.send(500);
    }
};

/**
 * Checks if a roman numeral is a valid roman numeral by checking if there's any letter that doesn't represent a roman numeral
 * @param {number} numToCheck number we want to check
 * @return {boolean} returns true if the number is valid, false otherwise 
 */
const isRomanNumber = (numToCheck: string) => {
    return !numToCheck.split("").some(letter => !asRomanArr.includes(letter));
};