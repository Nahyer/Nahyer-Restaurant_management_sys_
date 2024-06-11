import { Context } from "hono";
import { getOrder_menu_itemsService, createOrder_menu_itemService, getOrder_menu_itemByIdService, updateOrder_menu_itemService, DeleteOrder_menu_itemByIdService } from "./order_menu_items.service";


export const ListsOrder_menu_items = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getOrder_menu_itemsService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetOrder_menu_itemById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const order_menu_item = await getOrder_menu_itemByIdService(id);
        if(!order_menu_item) return c.json({ message: "order_menu_item not found"},404);
        return c.json(order_menu_item);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateOrder_menu_item = async(c: Context) => {
    try {
        const order_menu_item = await c.req.json();
        order_menu_item.created_at = new Date();
        const newOrder_menu_item = await createOrder_menu_itemService(order_menu_item);
        if(!newOrder_menu_item) return c.json({ message: "Unable to create"},404);
        return c.json(newOrder_menu_item, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateOrder_menu_item = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uorder_menu_item = await getOrder_menu_itemByIdService(id);
        if (!Uorder_menu_item) return c.text("Order_menu_item not found", 404);
        const order_menu_item = await c.req.json();
        const upOrder_menu_item = await updateOrder_menu_itemService(id, order_menu_item);
        if (!upOrder_menu_item) return c.text("Order_menu_item not updated", 404);
        return c.json(upOrder_menu_item, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteOrder_menu_item = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DOrder_menu_item = await getOrder_menu_itemByIdService(id);
    if (!DOrder_menu_item) return c.text("Order_menu_item not found", 404);
        const delOrder_menu_item = await DeleteOrder_menu_itemByIdService(id);
        if (!delOrder_menu_item) return c.text("Order_menu_item not deleted", 404);
        return c.json(delOrder_menu_item, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}