import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder_menu_item, TSOrder_menu_item, order_menu_item } from "../drizzle/schema";

export const getOrder_menu_itemsService = async (limit?: number): Promise<TSOrder_menu_item[] | null> => {
  if (limit) {
   return await db.query.order_menu_item.findMany({
    with:{
      orders:{
        columns:{
          delivery_address_id: true,
        }
      },
      menu_item:{
        columns:{
          name: true,
          price: true,
        }
      }
     },
      limit: limit,
    });
  }
  return await db.query.order_menu_item.findMany({
    with:{
      orders:{
        columns:{
          delivery_address_id: true,
        }
      },
      menu_item:{
        columns:{
          name: true,
          price: true,
        }
      }
     }
  });
};
export const getOrder_menu_itemByIdService = async (id: number): Promise<TSOrder_menu_item | undefined> => {
  return await db.query.order_menu_item.findFirst({
     where: eq(order_menu_item.id,id)
    })
}

export const createOrder_menu_itemService = async (order_menu_items: TIOrder_menu_item) => {
  await db.insert(order_menu_item).values(order_menu_items)
  return `Order_menu_item, has been created`;
}

export const updateOrder_menu_itemService = async (id: number, Order_menu_item: TIOrder_menu_item) => {

    await db.update(order_menu_item).set(Order_menu_item)
    .where(eq(order_menu_item.id, id))
    return `Order_menu_item, has been updated successfully`
}

export const DeleteOrder_menu_itemByIdService = async (id: number) =>{
  //query the order_menu_item table and delete the order_menu_item with the id
  const delOrder_menu_item = await db.query.order_menu_item.findFirst({
    where: eq(order_menu_item.id, id)
  })
    await db.delete(order_menu_item).where(eq(order_menu_item.id, id))
    return `Order_menu_item, has been deleted successfully`
}