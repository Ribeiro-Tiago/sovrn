import { addDoc } from "./Db";
import { asObj, asArabicArr, asRomanArr } from "./RomanNums";
import { NumberType } from "../interfaces";

/**
 * checks if the num exists in the DB. If it does returns it, if not converts, saves to db and returns it 
 * @param {number} originNum - number we want to convert
 * @param {NumberType} type - type we're converting to
 * @returns {string | number} - returns the converted number
 */
export const convertAndStore = async (originNum: number | string, type: NumberType): Promise<string | number> => {
    const convertedNum =
        type === "romans"
            ? toRoman(originNum as number)
            : toArabic(originNum as string);

    const result = await addDoc(type, { originNum, convertedNum });

    return result.ops[0].convertedNum;
};

/**
 * Converts an arabic number to the correspondent roman number
 * @param {number} numToConvert - arabic numnber we want to convert to roman
 * @return {string} - numToConvert in roman
 */
const toRoman = (numToConvert: number): string => {
    let result: string = "";

    const romanNums = asRomanArr;

    for (let letter of romanNums) {
        let letterNum = (asObj as any)[letter]; // arabic num associated with x letter
        let subtractController = Math.floor(numToConvert / letterNum);

        numToConvert -= subtractController * letterNum;
        result += letter.repeat(subtractController);
    }

    return result;
};

/**
 * Converts a roman number to the correspondent arabic number
 * if numToConvert is invalid it'll return either 0 or the result of the number up tot he invalid bit. It's not case sensitive
 * e.g.: 
 * toArabic(AA) === 0; 
 * toArabic(AI) === 0; 
 * toArabic(IIIV) === 3 
 * @param {string} numToConvert - roman numnber we want to convert to arabic
 * @return {number} - numToConvert in arabic
 */
const toArabic = (numToConvert: string): number => {
    let result = 0;
    const arabicNums = asArabicArr;
    const romanNums = asRomanArr;

    numToConvert = numToConvert.toUpperCase();

    romanNums.forEach((currRoman, index) => {
        while (numToConvert.indexOf(currRoman) === 0) {
            result += arabicNums[index];
            numToConvert = numToConvert.replace(currRoman, '');
        }
    });

    return result;
};