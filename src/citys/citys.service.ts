import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity, TSCity, city } from "../drizzle/schema";

export const getCitysService = async (limit?: number): Promise<TSCity[] | null> => {
  if (limit) {
   return await db.query.city.findMany({
    with:{
      state:{
        columns:{
          name: true
        }
      },
      restaurant:{
        columns:{
          name: true,
          street_address: true
        }
      }
     },
      limit: limit,
    });
  }
  return await db.query.city.findMany({
    with:{
      state:{
        columns:{
          name: true
        }
      },
      restaurant:{
        columns:{
          name: true,
          street_address: true
        }
      }
     }
  });
};
export const getCityByIdService = async (id: number): Promise<TSCity | undefined> => {
  return await db.query.city.findFirst({
    with:{
      state:{
        columns:{
          name: true
        }
      },
      restaurant:{
        columns:{
          name: true,
          street_address: true
        }
      }
     },
     where: eq(city.id,id)
    })
}

export const createCityService = async (citys: TICity) => {
  await db.insert(city).values(citys)
  return `City, has been created`;
}

export const updateCityService = async (id: number, City: TICity) => {

    await db.update(city).set(City)
    .where(eq(city.id, id))
    return `City, has been updated successfully`
}

export const DeleteCityByIdService = async (id: number) =>{
  //query the city table and delete the city with the id
  const delCity = await db.query.city.findFirst({
    where: eq(city.id, id)
  })
    await db.delete(city).where(eq(city.id, id))
    return `City, has been deleted successfully`
}