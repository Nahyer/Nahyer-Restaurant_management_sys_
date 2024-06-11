import { auth_on_users, TIAuth_on_users, TSAuth_on_users} from "../drizzle/schema"; 
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuth_on_users):Promise<string | null> => {
    //add a condtion if user already exist
    const userExist = await db.query.auth_on_users.findFirst({
        where: sql`${auth_on_users.username} = ${user.username}`
    })
    if(userExist){
        return "User already exist";
    }
    await db.insert(auth_on_users).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuth_on_users) => {
    const{username} = user;
    return await db.query.auth_on_users.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: sql`${auth_on_users.username} = ${username}`,
        with:{
            users:{
                columns:{
                    id: true,
                    name: true,
                    contact_phone: true,
                    email: true
                }
             }
        }
    })
}