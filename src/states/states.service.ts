import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIState, TSState, state } from "../drizzle/schema";

export const getStatesService = async (limit?: number): Promise<TSState[] | null> => {
  if (limit) {
  return await db.query.state.findMany();
  }
  return await db.query.state.findMany();
};
export const getStateByIdService = async (id: number): Promise<TSState | undefined> => {
  return await db.query.state.findFirst({
     where: eq(state.id,id)
    })
}

export const createStateService = async (states: TIState) => {
  await db.insert(state).values(states)
  return `State ${states.name}, has been`;
}

export const updateStateService = async (id: number, user: TIState) => {

    await db.update(state).set(user)
    .where(eq(state.id, id))
    return `State ${user.name}, has been updated successfully`
}

export const DeleteStateByIdService = async (id: number) =>{
  //query the state table and delete the state with the id
  const delState = await db.query.state.findFirst({
    where: eq(state.id, id)
  })
    await db.delete(state).where(eq(state.id, id))
    return `State ${delState?.name}, has been deleted successfully`
}