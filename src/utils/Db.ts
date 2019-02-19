import { MongoClient, Collection } from "mongodb";

import { InsertedDocument } from "../interfaces";

interface ConnectResult {
    con: MongoClient;
    coll: Collection<any>;
};

const connect = async (collection: string | string[]): Promise<ConnectResult> => {
    try {
        const con = await MongoClient.connect(`${process.env.DB_SERVER}`, { useNewUrlParser: true });

        return {
            con,
            coll: con.db().collection(collection as string)
        };
    } catch (err) {
        throw err;
    }
};

export const findOne = async (collection: string, filter: object) => {
    try {
        const { con, coll } = await connect(collection);

        const result = coll.findOne(filter, { projection: { _id: 0, originNum: 0 } })

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const addDoc = async (collection: string, doc: InsertedDocument) => {
    try {
        const { con, coll } = await connect(collection);

        const result = coll.insertOne(doc)

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const findAllOfType = async (collection: string) => {
    try {
        const { con, coll } = await connect(collection);

        const result = coll.find({}, { batchSize: 100, projection: { _id: 0 } }).toArray();

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const removeAll = async () => {
    try {
        const con = await MongoClient.connect(`${process.env.DB_SERVER}`, { useNewUrlParser: true });

        await con.db().dropCollection("romans");
        await con.db().dropCollection("arabics");
    } catch (err) {
        throw err;
    }
};