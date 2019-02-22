import { findAllOfType } from "../utils/Db";
import { Document } from "../interfaces";

/**
 * Attemps to get all numbers stored of a given type 
 * @param {string} type - type of numbers we want
 * @return {Promise<Document[]>} - a promise that resolves to an array contaning all the docs of the given type stored
 */
export const fetchAll = async (type: string): Promise<Document[]> => await findAllOfType(type);