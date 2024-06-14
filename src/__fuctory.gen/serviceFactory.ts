// import { eq } from "drizzle-orm";
// import db from "../drizzle/db";

// import { city, restaurant, address, restaurant_owner,
//      users, driver, comments, orders, menu_item, 
//      category, order_menu_item, order_status, 
//      status_catalog, 
//      state} from "../drizzle/schema";

// //      type TableName = "users" | "address" | "city" | "state" | "restaurant" | "restaurant_owner" | "driver" | "comments" | "orders" | "menu_item" | "category" | "order_menu_item" | "order_status" | "status_catalog";
// // // Define a type that includes all possible tables
// // const tableMap = {
// //     users,
// //     address,
// //     city,
// //     state,
// //     restaurant,
// //     restaurant_owner,
// //     driver,
// //     comments,
// //     orders,
// //     menu_item,
// //     category,
// //     order_menu_item,
// //     order_status,
// //     status_catalog
// //   } as const;
  
//   type TableSchema = typeof city | typeof restaurant | typeof address | typeof restaurant_owner | typeof users | typeof driver | typeof comments | typeof orders | typeof menu_item | typeof category | typeof order_menu_item | typeof order_status | typeof status_catalog | typeof state;
// // Generic Service Factory
// export const createGenericService = <TInsert, TSelect>(table: TableSchema) => {

//     return {
//       findAll: async (): Promise<TSelect[] | null> => {
//         return await db.query.(table).findndMany();
//       },
//     findById: async (id: number): Promise<TSelect | undefined> => {
//       return await db.query[table as keyof typeof db.query].findFirst({
//         where: eq(table.id, id),
//       });
//     },
//     create: async (data: TInsert) => {
//       await db.insert(table).values(data);
//       return "New entity created";
//     },
//     update: async (id: number, data: TInsert) => {
//       await db.update(table).set(data).where(eq(entity.id, id));
//       return `Entity has been updated successfully`;
//     },
//     deleteById: async (id: number) => {
//       await db.delete(table).where(eq(table.id, id));
//       return `Entity has been deleted successfully`;
//     },
//   };
// }
