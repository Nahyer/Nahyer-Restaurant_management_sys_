import { Context } from "hono";
import { getStatus_catalogsService, createStatus_catalogService, getStatus_catalogByIdService, updateStatus_catalogService, DeleteStatus_catalogByIdService } from "./status_catalogs.service";


export const ListsStatus_catalogs = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getStatus_catalogsService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetStatus_catalogById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const status_catalog = await getStatus_catalogByIdService(id);
        if(!status_catalog) return c.json({ message: "status_catalog not found"},404);
        return c.json(status_catalog);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateStatus_catalog = async(c: Context) => {
    try {
        const status_catalog = await c.req.json();
        status_catalog.created_at = new Date();
        const newStatus_catalog = await createStatus_catalogService(status_catalog);
        if(!newStatus_catalog) return c.json({ message: "Unable to create"},404);
        return c.json(newStatus_catalog, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateStatus_catalog = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Ustatus_catalog = await getStatus_catalogByIdService(id);
        if (!Ustatus_catalog) return c.text("Status_catalog not found", 404);
        const status_catalog = await c.req.json();
        const upStatus_catalog = await updateStatus_catalogService(id, status_catalog);
        if (!upStatus_catalog) return c.text("Status_catalog not updated", 404);
        return c.json(upStatus_catalog, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteStatus_catalog = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DStatus_catalog = await getStatus_catalogByIdService(id);
    if (!DStatus_catalog) return c.text("Status_catalog not found", 404);
        const delStatus_catalog = await DeleteStatus_catalogByIdService(id);
        if (!delStatus_catalog) return c.text("Status_catalog not deleted", 404);
        return c.json(delStatus_catalog, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}