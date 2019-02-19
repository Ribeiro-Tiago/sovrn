import { isNullOrUndefined } from "util";

import { findOne } from "../utils/Db";
import { convertAndStore } from "../utils/Converter";

export const toArabic = async (originNum: number) => {
    const result = await findOne("arabics", { originNum });

    if (!isNullOrUndefined(result)) {
        return result.convertedNum;
    }

    return convertAndStore(originNum, "arabics");
};