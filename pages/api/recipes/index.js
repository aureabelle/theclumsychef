// const Recipe = require("../../model/Recipe");
// import connectDb from "../../middleware/database";

// const handler = async (req, res) => {
//   try {
//     let r = Recipe.find();
//     r.sort({ createdAt: -1 });

//     let recipes = await r.exec();
//     res.json(recipes);
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// };

// export default connectDb(handler);

// Import Dependencies
import { parse } from "url";
import { MongoClient } from "mongodb";

// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
export default async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Select the "users" collection from the database
  const collection = await db.collection("recipes");

  // Select the users collection from the database
  const recipes = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ recipes });
};