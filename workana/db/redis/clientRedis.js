import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const clientRedis = createClient({
  url: `redis://${process.env.REDIS_URL}:${process.env.PORTA_REDIS}`,
});
clientRedis.on("error", (err) => console.log("Redis Client Error", err));
await clientRedis.connect();

export default clientRedis;
