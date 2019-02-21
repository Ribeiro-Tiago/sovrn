import { MongoClient, Collection } from "mongodb";

export interface InsertedDocument {
    originNum: string | number;
    convertedNum: string | number;
};

export interface ConnectResult {
    con: MongoClient;
    collection: Collection<any>;
};

export interface DocumentResult {
    insertedValue: string | number;
    convertedNum: string | number;
};