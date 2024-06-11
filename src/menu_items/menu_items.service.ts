import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMenu_item, TSMenu_item, menu_item } from "../drizzle/schema";

export const getMenu_itemsService = async (limit?: number): Promise<TSMenu_item[] | null> => {
  if (limit) {
   return await db.query.menu_item.findMany({
      limit: limit,
    });
  }
  return await db.query.menu_item.findMany();
};
export const getMenu_itemByIdService = async (id: number): Promise<TSMenu_item | undefined> => {
  return await db.query.menu_item.findFirst({
     where: eq(menu_item.id,id)
    })
}

export const createMenu_itemService = async (menu_items: TIMenu_item) => {
  await db.insert(menu_item).values(menu_items)
  return `Menu_item, has been created`;
}

export const updateMenu_itemService = async (id: number, Menu_item: TIMenu_item) => {

    await db.update(menu_item).set(Menu_item)
    .where(eq(menu_item.id, id))
    return `Menu_item, has been updated successfully`
}

export const DeleteMenu_itemByIdService = async (id: number) =>{
  //query the menu_item table and delete the menu_item with the id
  const delMenu_item = await db.query.menu_item.findFirst({
    where: eq(menu_item.id, id)
  })
    await db.delete(menu_item).where(eq(menu_item.id, id))
    return `Menu_item, has been deleted successfully`
}