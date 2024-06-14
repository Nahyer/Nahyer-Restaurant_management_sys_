import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIComments, TSComments, comments } from "../drizzle/schema";

export const getCommentssService = async (limit?: number): Promise<TSComments[] | null> => {
  if (limit) {
   return await db.query.comments.findMany({
    with:{
      users:{
        columns:{
          name: true
        }
      },
      orders:{
        columns:{
          actual_delivery_time: true,
          price: true,
          restaurant_id: true
        }
      }
     },
      limit: limit,
    });
  }
  return await db.query.comments.findMany({
    with:{
      users:{
        columns:{
          name: true
        }
      },
      orders:{
        columns:{
          actual_delivery_time: true,
          price: true,
          restaurant_id: true
        }
      }
     },
  });
};
export const getCommentsByIdService = async (id: number): Promise<TSComments | undefined> => {
  return await db.query.comments.findFirst({
    with:{
      users:{
        columns:{
          name: true
        }
      },
      orders:{
        columns:{
          actual_delivery_time: true,
          price: true,
          restaurant_id: true
        }
      }
     },
     where: eq(comments.id,id)
    })
}

export const createCommentsService = async (commentss: TIComments) => {
  await db.insert(comments).values(commentss)
  return `Comments, has been created`;
}

export const updateCommentsService = async (id: number, Comments: TIComments) => {

    await db.update(comments).set(Comments)
    .where(eq(comments.id, id))
    return `Comments, has been updated successfully`
}

export const DeleteCommentsByIdService = async (id: number) =>{
  //query the comments table and delete the comments with the id
  const delComments = await db.query.comments.findFirst({
    where: eq(comments.id, id)
  })
    await db.delete(comments).where(eq(comments.id, id))
    return `Comments, has been deleted successfully`
}