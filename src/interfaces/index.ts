import { MongoClient, Collection } from "mongodb";

export interface ConnectResult {
    con: MongoClient;
    collection: Collection<any>;
};

export interface Document {
    inputValue: NumberType;
    convertedNum: NumberType;
};

export type NumberType = number | string;

export type NumTypeName = "romans" | "arabics";