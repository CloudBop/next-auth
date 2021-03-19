import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  // connect to db
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-auth?retryWrites=true&w=majority`
  );
  return client;
}
