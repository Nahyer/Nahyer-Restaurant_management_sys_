import { Column, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant, TSRestaurant, restaurant } from "../drizzle/schema";

export const getRestaurantsService = async (limit?: number): Promise<TSRestaurant[] | null> => {
  if (limit) {
   return await db.query.restaurant.findMany({
      limit: limit,
      with:{
        city:{
          columns:{
            name: true,
          }
        },
        menu_item:{
          columns:{
            name: true,
            price: true,
            ingredients: true,
            description: true

          }
        }
       }
    });
  }
  return await db.query.restaurant.findMany({
    with:{
      city:{
        columns:{
          name: true,
        }
      },
      menu_item:{
        columns:{
          name: true,
          price: true,
          ingredients: true,
          description: true

        }
      }
     }
  });
};
export const getRestaurantByIdService = async (id: number): Promise<TSRestaurant | undefined> => {
  return await db.query.restaurant.findFirst({
    with:{
      city:{
        columns:{
          name: true,
        }
      },
      menu_item:{
        columns:{
          name: true,
          price: true,
          ingredients: true,
          description: true

        }
      }
     },
     where: eq(restaurant.id,id)
    })
}

export const createRestaurantService = async (restaurants: TIRestaurant) => {
  await db.insert(restaurant).values(restaurants)
  return `Restaurant, has been created`;
}

export const updateRestaurantService = async (id: number, Restaurant: TIRestaurant) => {

    await db.update(restaurant).set(Restaurant)
    .where(eq(restaurant.id, id))
    return `Restaurant, has been updated successfully`
}

export const DeleteRestaurantByIdService = async (id: number) =>{
  //query the restaurant table and delete the restaurant with the id
  const delRestaurant = await db.query.restaurant.findFirst({
    where: eq(restaurant.id, id)
  })
    await db.delete(restaurant).where(eq(restaurant.id, id))
    return `Restaurant, has been deleted successfully`
}