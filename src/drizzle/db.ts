import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export const sql = neon(process.env.Database_URL as string)
// export const sql = neon("postgresql://RestorantDB_owner:iQB4akYtu8cF@ep-rough-pine-a509smkk.us-east-2.aws.neon.tech/RestorantDB?sslmode=require")
const db = drizzle(sql, { schema, logger: true }) 

export default db; 