import { MongoClient, InsertOneWriteOpResult } from "mongodb";

import { InsertedDocument, ConnectResult, DocumentResult } from "../interfaces";


const connect = async (collection?: string): Promise<ConnectResult | MongoClient> => {
    try {
        const con = await MongoClient.connect(`${process.env.DB_SERVER}`, { useNewUrlParser: true });

        if (!collection) {
            return con;
        }

        return {
            con,
            collection: con.db().collection(collection)
        };
    } catch (err) {
        throw err;
    }
};

export const findOne = async (collection_name: string, filter: object): Promise<DocumentResult> => {
    try {
        const { con, collection } = await connect(collection_name) as ConnectResult;

        const result = collection.findOne(filter, { projection: { _id: 0, originNum: 0 } })

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const addDoc = async (collection_name: string, doc: InsertedDocument): Promise<InsertOneWriteOpResult> => {
    try {
        const { con, collection } = await connect(collection_name) as ConnectResult;

        const result = collection.insertOne(doc)

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const findAllOfType = async (collection_name: string): Promise<Array<DocumentResult>> => {
    try {
        const { con, collection } = await connect(collection_name) as ConnectResult;

        const result = collection.find({}, { batchSize: 100, projection: { _id: 0 } }).toArray();

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const removeAll = async (): Promise<void> => {
    try {
        const con = await connect() as MongoClient;

        await con.db().dropCollection("romans");
        await con.db().dropCollection("arabics");
    } catch (err) {
        throw err;
    }
};