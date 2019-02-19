import { findAllOfType } from "../utils/Db";

export const fetchAll = async (type: string) => await findAllOfType(type);