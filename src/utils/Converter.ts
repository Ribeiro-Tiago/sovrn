import { addDoc } from "./Db";

export const convertAndStore = async (originNum: number, collection: string) => {
    const convertedNum =
        collection === "romans"
            ? toRoman(originNum)
            : toArabic(originNum);

    const result = await addDoc(collection, { originNum, convertedNum });

    return result.ops[0].convertedNum;
};

const toRoman = (_number: number) => {
    return "I";
};

const toArabic = (_number: number) => {
    return "1"
};