import { addDoc } from "./db";

export const convertAndStore = async (originNum: number, collection: string) => {
    const convertedNum = convert(originNum);

    const result = await addDoc(collection, { originNum, convertedNum });

    return result.ops[0].originNum;
};

const convert = (_number: number) => {
    return "I";
};