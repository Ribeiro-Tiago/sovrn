import { isNullOrUndefined } from "util";
import { MongoClient, InsertOneWriteOpResult } from "mongodb";

import { ConnectResult, Document } from "../interfaces";

/**
 * Creates a connection to the database and gets the specified collection object for quering.
 * @param {string | undefined} collection name of the collection we want to return
 * @returns {ConnectResult | MongoClient} if the collection argument is specified, we return the connection object (to be able to close the connection at the end) and collection object. If not we just return the connection
 */
const connect = async (collection?: string): Promise<ConnectResult | MongoClient> => {
    const db_server = process.env.DB_SERVER;

    if (isNullOrUndefined(db_server)) {
        throw new Error("Server uri needs to be specified.")
    }

    try {
        const con = await MongoClient.connect(db_server, { useNewUrlParser: true });

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

export const findOne = async (collection_name: string, filter: object): Promise<Document> => {
    try {
        const { con, collection } = await connect(collection_name) as ConnectResult;

        const result = collection.findOne(filter, { projection: { _id: 0, inputValue: 0 } })

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const addDoc = async (collection_name: string, doc: Document): Promise<InsertOneWriteOpResult> => {
    try {
        const { con, collection } = await connect(collection_name) as ConnectResult;

        const result = collection.insertOne(doc)

        con.close();

        return result;
    } catch (err) {
        throw err;
    }
};

export const findAllOfType = async (collection_name: string): Promise<Array<Document>> => {
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