import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, auth_on_users, users } from "../drizzle/schema";

export const getUserssService = async (limit?: number): Promise<TSUsers[] | null> => {
  if (limit) {
   return await db.query.users.findMany({
      limit: limit,
    });
  }
  // return await db.query.users.findMany({
  //   with: {
  //     auth_on_users:{
  //       columns:{
  //         username: true,
  //         role: true,
  //         password: true
  //       }
  //     }
  //   }
  // })

    return await db.query.users.findMany();
 
};
export const getUsersByIdService = async (id: number): Promise<TSUsers | undefined> => {
  return await db.query.users.findFirst({
     where: eq(users.id,id)
    })
}

export const createUsersService = async (userss: TIUsers) => {
  await db.insert(users).values(userss)
  return `Users, has been created`;
}

export const updateUsersService = async (id: number, Users: TIUsers) => {

    await db.update(users).set(Users)
    .where(eq(users.id, id))
    return `Users, has been updated successfully`
}

export const DeleteUsersByIdService = async (id: number) =>{
  //query the users table and delete the users with the id
  const delUsers = await db.query.users.findFirst({
    where: eq(users.id, id)
  })
    await db.delete(users).where(eq(users.id, id))
    return `Users, has been deleted successfully`
}