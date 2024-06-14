import { auth_on_users,TSAuth_on_users ,TIAuth_on_users,TIUsers, TSUsers, users} from "../drizzle/schema"; 
import db from "../drizzle/db";
import { sql } from "drizzle-orm";


import { getUsersService } from "../userss/userss.service";
export type TAuthUser = {
    name: string,
    contact_phone: string,
    phone_verified: boolean,
    email: string,
    email_verified: boolean,
    confirmation_code: string,
    username: string,
    password: string,
    created_at: Date,
    user_id: number,
    role: 'admin' | 'user'| "driver" | "restaurantOwner"
    
}
export const createAuthUserService = async (user:TAuthUser):Promise<string | null> => {
    const userExist = await db.query.auth_on_users.findFirst({
        where: sql`${auth_on_users.username} = ${user.name}`
    })
    if(userExist){
        return "User already exist";
    }
    await db.insert(users).values({
        name: user.name,
        contact_phone: user.contact_phone,
        phone_verified: user.phone_verified,
        email: user.email,
        email_verified: user.email_verified,
        confirmation_code: user.confirmation_code,
        created_at: new Date()
    })
    const userId = await getUsersService(user )
    if(userId?.id === undefined) throw new Error("User not found")
    await db.insert(auth_on_users).values({
        user_id: userId.id,
        password: user.password,
        username: user.username,
    
    })
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
