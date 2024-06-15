import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/node-postgres/driver";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { Client } from "pg";



// export const client = new Client({
//     connectionString: process.env.DATABASE_URL as string,   //get the database url from the environment
// })

// const main = async () => {
//     await client.connect();  //connect to the database
// }
// main();

// const db = drizzle(client, { schema, logger: true }) 


export const sql = neon(process.env.DATABASE_URL as string)
const db = drizzle(sql, { schema, logger: true }) 


export default db; 