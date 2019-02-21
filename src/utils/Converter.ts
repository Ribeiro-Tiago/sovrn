import { addDoc } from "./Db";
import { asObj, asArabicArr, asRomanArr } from "./RomanNums";

export const convertAndStore = async (originNum: number | string, collection: string): Promise<string | number> => {
    const convertedNum =
        collection === "romans"
            ? toRoman(originNum as number)
            : toArabic(originNum as string);

    const result = await addDoc(collection, { originNum, convertedNum });

    return result.ops[0].convertedNum;
};

const toRoman = (number: number): string => {
    let result: string = "";

    const romanNums = asRomanArr;

    for (let letter of romanNums) {
        let letterNum = (asObj as any)[letter]; // arabic num associated with x letter
        let q = Math.floor(number / letterNum);

        number -= q * letterNum;
        result += letter.repeat(q);
    }

    return result;
};

const toArabic = (number: string): number => {
    let result = 0;

    const arabicNums = asArabicArr;
    const romanNums = asRomanArr;

    arabicNums.forEach((currNum, index) => {
        const currRoman = romanNums[index];

        while (number.indexOf(currRoman) === 0) {
            result += currNum;
            number = number.replace(currRoman, '');
        }
    });

    return result;
};