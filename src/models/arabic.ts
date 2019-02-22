import { getValue } from "../utils/Finder";

/**
 * Looks for the number we want to convert in the db. If we find it, we return it. If not we convert, store on db and return the converted value.
 * @param {number} inputValue - num we want to convert
 * @return {Promise<string>} a promise that resovles to the converted number
 */
export const toArabic = async (inputValue: number): Promise<string> => getValue(inputValue, "arabics") as Promise<string>;
