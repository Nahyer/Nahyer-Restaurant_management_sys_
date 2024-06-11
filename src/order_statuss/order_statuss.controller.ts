import { Context } from "hono";
import { getOrder_statussService, createOrder_statusService, getOrder_statusByIdService, updateOrder_statusService, DeleteOrder_statusByIdService } from "./order_statuss.service";


export const ListsOrder_statuss = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getOrder_statussService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetOrder_statusById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const order_status = await getOrder_statusByIdService(id);
        if(!order_status) return c.json({ message: "order_status not found"},404);
        return c.json(order_status);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateOrder_status = async(c: Context) => {
    try {
        const order_status = await c.req.json();
        order_status.created_at = new Date();
        const newOrder_status = await createOrder_statusService(order_status);
        if(!newOrder_status) return c.json({ message: "Unable to create"},404);
        return c.json(newOrder_status, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateOrder_status = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uorder_status = await getOrder_statusByIdService(id);
        if (!Uorder_status) return c.text("Order_status not found", 404);
        const order_status = await c.req.json();
        const upOrder_status = await updateOrder_statusService(id, order_status);
        if (!upOrder_status) return c.text("Order_status not updated", 404);
        return c.json(upOrder_status, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteOrder_status = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DOrder_status = await getOrder_statusByIdService(id);
    if (!DOrder_status) return c.text("Order_status not found", 404);
        const delOrder_status = await DeleteOrder_statusByIdService(id);
        if (!delOrder_status) return c.text("Order_status not deleted", 404);
        return c.json(delOrder_status, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}