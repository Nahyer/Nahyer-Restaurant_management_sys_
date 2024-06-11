import { Context } from "hono";
import { getStatesService, createStateService, getStateByIdService, updateStateService, DeleteStateByIdService } from "./states.service";


export const ListsStates = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getStatesService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetStateById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const state = await getStateByIdService(id);
        if(!state) return c.json({ message: "state not found"},404);
        return c.json(state);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateState = async(c: Context) => {
    try {
        const state = await c.req.json();
        const newState = await createStateService(state);
        if(!newState) return c.json({ message: "Unable to create"},404);
        return c.json(newState, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateState = async(c: Context) => {
    try {
        const id = await parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const state = await c.req.json();
        state.updated_at = new Date(); // Modify the createdAt property
        const upState = await updateStateService(id, state);
        if (!upState) return c.text("User not updated", 404);
        return c.json(upState, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteState = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const id = await parseInt(c.req.param('id'));
        const delState = await DeleteStateByIdService(id);
        if (!delState) return c.text("User not deleted", 404);
        return c.json(delState, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}