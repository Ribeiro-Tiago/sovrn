import { isNullOrUndefined } from "util";

import { findOne } from "../utils/db";
import { convertAndStore } from "../utils/Converter";

export const toRoman = async (originNum: number) => {
    const result = await findOne("romans", { originNum });

    if (!isNullOrUndefined(result)) {
        return result.convertedNum;
    }

    return convertAndStore(originNum, "romans");
};