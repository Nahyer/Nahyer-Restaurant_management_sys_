import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrders, TSOrders, orders } from "../drizzle/schema";

export const getOrderssService = async (limit?: number): Promise<TSOrders[] | null> => {
  if (limit) {
   return await db.query.orders.findMany({
    with:{
      driver:{
        columns:{
          car_make: true,
        }
      },
      users:{
        columns:{
          name: true,
          contact_phone: true
        }
      }
     },
      limit: limit,
    });
  }
  return await db.query.orders.findMany({
    with:{
      driver:{
        columns:{
          car_make: true,
        }
      },
      users:{
        columns:{
          name: true,
          contact_phone: true
        }
      }
     },
  });
};
export const getOrdersByIdService = async (id: number): Promise<TSOrders | undefined> => {
  return await db.query.orders.findFirst({
     where: eq(orders.id,id)
    })
}

export const createOrdersService = async (orderss: TIOrders) => {
  await db.insert(orders).values(orderss)
  return `Orders, has been created`;
}

export const updateOrdersService = async (id: number, Orders: TIOrders) => {

    await db.update(orders).set(Orders)
    .where(eq(orders.id, id))
    return `Orders, has been updated successfully`
}

export const DeleteOrdersByIdService = async (id: number) =>{
  //query the orders table and delete the orders with the id
  const delOrders = await db.query.orders.findFirst({
    where: eq(orders.id, id)
  })
    await db.delete(orders).where(eq(orders.id, id))
    return `Orders, has been deleted successfully`
}
