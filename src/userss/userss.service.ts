import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, auth_on_users, users } from "../drizzle/schema";
import { TAuthUser } from "../auth/auth.service";



export const getUserssService = async (limit?: number): Promise<TSUsers[] | null> => {
  if (limit) {
   return await db.query.users.findMany({
      limit: limit,
    });
  }
  return await db.query.users.findMany({
    with:{
      auth:{
        columns:{
          username: true,
          role: true
        }

      },
       driver:{
          columns:{
            car_make: true,
            car_model: true,
            online: true
          }
        
       }
     }
  })
 
};
export const getUsersByIdService = async (id: number): Promise<TSUsers | undefined> => {
  return await db.query.users.findFirst({
     where: eq(users.id,id),
     with:{
      auth:{
        columns:{
          username: true,
          role: true
        }

      },
       driver:{
          columns:{
            car_make: true,
            car_model: true,
            online: true
          }
        
       }
     }
    })
}

export const createUsersService = async (userss: TIUsers) => {
  await db.insert(users).values(userss)
  return `Users, has been created`;
}

export const updateUserService = async (id: number, userss: TIUsers) => {
  await db.update(users).set(userss).where(eq(users.id, id))
  return "User updated successfully";
}

export const DeleteUsersByIdService = async (id: number) =>{
  //query the users table and delete the users with the id
  const delUsers = await db.query.users.findFirst({
    where: eq(users.id, id)
  })
    await db.delete(users).where(eq(users.id, id))
    return `Users, has been deleted successfully`
}


export const getUsersService =async (user:TAuthUser)=>{
  return await db.query.users.findFirst({
  columns:{
    id: true
  },
    where: eq(users.name, user.name) && eq(users.email, user.email)
  })
 
}

export const updateUserRoleService = async (id: number, Users: TAuthUser) => {
    await db.insert(auth_on_users).values({
    user_id: id,
    username: Users.username,
    password: Users.password,
    role: Users.role
  })
  return `${Users.username}, has been updated successfully`
}
