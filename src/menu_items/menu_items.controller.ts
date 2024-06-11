import { Context } from "hono";
import { getMenu_itemsService, createMenu_itemService, getMenu_itemByIdService, updateMenu_itemService, DeleteMenu_itemByIdService } from "./menu_items.service";


export const ListsMenu_items = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getMenu_itemsService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetMenu_itemById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const menu_item = await getMenu_itemByIdService(id);
        if(!menu_item) return c.json({ message: "menu_item not found"},404);
        return c.json(menu_item);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateMenu_item = async(c: Context) => {
    try {
        const menu_item = await c.req.json();
        menu_item.created_at = new Date();
        const newMenu_item = await createMenu_itemService(menu_item);
        if(!newMenu_item) return c.json({ message: "Unable to create"},404);
        return c.json(newMenu_item, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateMenu_item = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Umenu_item = await getMenu_itemByIdService(id);
        if (!Umenu_item) return c.text("Menu_item not found", 404);
        const menu_item = await c.req.json();
        const upMenu_item = await updateMenu_itemService(id, menu_item);
        if (!upMenu_item) return c.text("Menu_item not updated", 404);
        return c.json(upMenu_item, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteMenu_item = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DMenu_item = await getMenu_itemByIdService(id);
    if (!DMenu_item) return c.text("Menu_item not found", 404);
        const delMenu_item = await DeleteMenu_itemByIdService(id);
        if (!delMenu_item) return c.text("Menu_item not deleted", 404);
        return c.json(delMenu_item, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}