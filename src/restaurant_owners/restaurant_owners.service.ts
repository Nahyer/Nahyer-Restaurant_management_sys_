import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant_owner, TSRestaurant_owner, restaurant_owner } from "../drizzle/schema";

export const getRestaurant_ownersService = async (limit?: number): Promise<TSRestaurant_owner[] | null> => {
  if (limit) {
   return await db.query.restaurant_owner.findMany({
      limit: limit,
    });
  }
  return await db.query.restaurant_owner.findMany();
};
export const getRestaurant_ownerByIdService = async (id: number): Promise<TSRestaurant_owner | undefined> => {
  return await db.query.restaurant_owner.findFirst({
     where: eq(restaurant_owner.id,id)
    })
}

export const createRestaurant_ownerService = async (restaurant_owners: TIRestaurant_owner) => {
  await db.insert(restaurant_owner).values(restaurant_owners)
  return `Restaurant_owner, has been created`;
}

export const updateRestaurant_ownerService = async (id: number, Restaurant_owner: TIRestaurant_owner) => {

    await db.update(restaurant_owner).set(Restaurant_owner)
    .where(eq(restaurant_owner.id, id))
    return `Restaurant_owner, has been updated successfully`
}

export const DeleteRestaurant_ownerByIdService = async (id: number) =>{
  //query the restaurant_owner table and delete the restaurant_owner with the id
  const delRestaurant_owner = await db.query.restaurant_owner.findFirst({
    where: eq(restaurant_owner.id, id)
  })
    await db.delete(restaurant_owner).where(eq(restaurant_owner.id, id))
    return `Restaurant_owner, has been deleted successfully`
}