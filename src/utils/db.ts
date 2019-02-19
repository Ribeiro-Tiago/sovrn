import { MongoClient } from "mongodb";
import { InsertedDocument } from "src/interfaces";

const connect = async (collection: string) => {
    try {
        const con = await MongoClient.connect(`${process.env.DB_SERVER}`, { useNewUrlParser: true });

        return {
            con,
            coll: con.db().collection(collection)
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