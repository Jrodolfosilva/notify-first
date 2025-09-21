import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  url: `redis://${process.env.REDIS_URL}:${process.env.PORTA_REDIS}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

export default client;
