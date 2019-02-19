import { addDoc, findOne } from "../utils/db";
import { isNullOrUndefined } from "util";

export const toRoman = async (originNum: number) => {
    const result = await findOne("romans", { originNum });

    if (!isNullOrUndefined(result)) {
        return result.convertedNum;
    }

    return convertAndStore(originNum);
};

const convertAndStore = async (originNum: number) => {
    const convertedNum = convert(originNum);

    const result = await addDoc("romans", { originNum, convertedNum });

    return result.ops[0].originNum;
};

const convert = (_number: number) => {
    return "I";
};