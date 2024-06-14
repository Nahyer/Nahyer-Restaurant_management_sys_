import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICategory, TSCategory, category } from "../drizzle/schema";

export const getCategorysService = async (limit?: number): Promise<TSCategory[] | null> => {
  if (limit) {
   return await db.query.category.findMany({
    with:{
      menu_item:{
        columns:{
         name: true,
         restaurant_id: true,
        }
      }
    },
      limit: limit,
    });
  }
  return await db.query.category.findMany();
};
export const getCategoryByIdService = async (id: number): Promise<TSCategory | undefined> => {
  return await db.query.category.findFirst({
     where: eq(category.id,id)
    })
}

export const createCategoryService = async (categorys: TICategory) => {
  await db.insert(category).values(categorys)
  return `Category, has been created`;
}

export const updateCategoryService = async (id: number, Category: TICategory) => {

    await db.update(category).set(Category)
    .where(eq(category.id, id))
    return `Category, has been updated successfully`
}

export const DeleteCategoryByIdService = async (id: number) =>{
  //query the category table and delete the category with the id
  const delCategory = await db.query.category.findFirst({
    where: eq(category.id, id)
  })
    await db.delete(category).where(eq(category.id, id))
    return `Category, has been deleted successfully`
}