import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, driver } from "../drizzle/schema";

export const getDriversService = async (limit?: number): Promise<TSDriver[] | null> => {
  if (limit) {
   return await db.query.driver.findMany({
      limit: limit,
    });
  }
  return await db.query.driver.findMany();
};
export const getDriverByIdService = async (id: number): Promise<TSDriver | undefined> => {
  return await db.query.driver.findFirst({
     where: eq(driver.id,id)
    })
}

export const createDriverService = async (drivers: TIDriver) => {
  await db.insert(driver).values(drivers)
  return `Driver, has been created`;
}

export const updateDriverService = async (id: number, Driver: TIDriver) => {

    await db.update(driver).set(Driver)
    .where(eq(driver.id, id))
    return `Driver, has been updated successfully`
}

export const DeleteDriverByIdService = async (id: number) =>{
  //query the driver table and delete the driver with the id
  const delDriver = await db.query.driver.findFirst({
    where: eq(driver.id, id)
  })
    await db.delete(driver).where(eq(driver.id, id))
    return `Driver, has been deleted successfully`
}