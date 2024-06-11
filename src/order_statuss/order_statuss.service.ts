import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder_status, TSOrder_status, order_status } from "../drizzle/schema";

export const getOrder_statussService = async (limit?: number): Promise<TSOrder_status[] | null> => {
  if (limit) {
   return await db.query.order_status.findMany({
      limit: limit,
    });
  }
  return await db.query.order_status.findMany();
};
export const getOrder_statusByIdService = async (id: number): Promise<TSOrder_status | undefined> => {
  return await db.query.order_status.findFirst({
     where: eq(order_status.id,id)
    })
}

export const createOrder_statusService = async (order_statuss: TIOrder_status) => {
  await db.insert(order_status).values(order_statuss)
  return `Order_status, has been created`;
}

export const updateOrder_statusService = async (id: number, Order_status: TIOrder_status) => {

    await db.update(order_status).set(Order_status)
    .where(eq(order_status.id, id))
    return `Order_status, has been updated successfully`
}

export const DeleteOrder_statusByIdService = async (id: number) =>{
  //query the order_status table and delete the order_status with the id
  const delOrder_status = await db.query.order_status.findFirst({
    where: eq(order_status.id, id)
  })
    await db.delete(order_status).where(eq(order_status.id, id))
    return `Order_status, has been deleted successfully`
}