import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIStatus_catalog, TSStatus_catalog, status_catalog } from "../drizzle/schema";

export const getStatus_catalogsService = async (limit?: number): Promise<TSStatus_catalog[] | null> => {
  if (limit) {
   return await db.query.status_catalog.findMany({
      limit: limit,
      with:{
        order_status:{
          columns:{
            order_id: true,
          }
        }
       }
    });
  }
  return await db.query.status_catalog.findMany({
    with:{
      order_status:{
        columns:{
          order_id: true,
        }
      }
     }
  });
};
export const getStatus_catalogByIdService = async (id: number): Promise<TSStatus_catalog | undefined> => {
  return await db.query.status_catalog.findFirst({
     where: eq(status_catalog.id,id),
     with:{
      order_status:{
        columns:{
          order_id: true,
        }
      }
     }
    })
}

export const createStatus_catalogService = async (status_catalogs: TIStatus_catalog) => {
  await db.insert(status_catalog).values(status_catalogs)
  return `Status_catalog, has been created`;
}

export const updateStatus_catalogService = async (id: number, Status_catalog: TIStatus_catalog) => {

    await db.update(status_catalog).set(Status_catalog)
    .where(eq(status_catalog.id, id))
    return `Status_catalog, has been updated successfully`
}

export const DeleteStatus_catalogByIdService = async (id: number) =>{
  //query the status_catalog table and delete the status_catalog with the id
  const delStatus_catalog = await db.query.status_catalog.findFirst({
    where: eq(status_catalog.id, id)
  })
    await db.delete(status_catalog).where(eq(status_catalog.id, id))
    return `Status_catalog, has been deleted successfully`
}