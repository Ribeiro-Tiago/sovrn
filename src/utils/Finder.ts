import { isNullOrUndefined } from "util";

import { findOne } from "./Db";
import { convertAndStore } from "./Converter";
import { NumberType, NumTypeName } from "../interfaces";

/**
 * Looks for the number we want to convert in the db. If we find it, we return it. If not we convert, store on db and return the converted value.
 * @param {NumberType} inputValue - num we want to convert
 * @param {NumTypeName} type - type we want to convert to
 * @return {Promise<NumberType>} a promise that resovles to the converted number
 */
export const getValue = async (inputValue: NumberType, type: NumTypeName): Promise<NumberType> => {
    const result = await findOne(type, { inputValue });

    if (!isNullOrUndefined(result)) {
        return result.convertedNum;
    }

    return convertAndStore(inputValue, type);
};