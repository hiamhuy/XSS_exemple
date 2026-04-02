import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Vercel-Admin-atlas-teal-lantern:mFPTu42Vd1wjWyqN@atlas-teal-lantern.gntmwr1.mongodb.net/?retryWrites=true&w=majority";

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;