import { Context } from "hono";
import { getOrderssService, createOrdersService, getOrdersByIdService, updateOrdersService, DeleteOrdersByIdService } from "./orderss.service";


export const ListsOrderss = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getOrderssService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetOrdersById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const orders = await getOrdersByIdService(id);
        if(!orders) return c.json({ message: "orders not found"},404);
        return c.json(orders);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateOrders = async(c: Context) => {
    try {
        const orders = await c.req.json();
        orders.created_at = new Date();
        const newOrders = await createOrdersService(orders);
        if(!newOrders) return c.json({ message: "Unable to create"},404);
        return c.json(newOrders, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateOrders = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uorders = await getOrdersByIdService(id);
        if (!Uorders) return c.text("Orders not found", 404);
        const orders = await c.req.json();
        const upOrders = await updateOrdersService(id, orders);
        if (!upOrders) return c.text("Orders not updated", 404);
        return c.json(upOrders, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteOrders = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DOrders = await getOrdersByIdService(id);
    if (!DOrders) return c.text("Orders not found", 404);
        const delOrders = await DeleteOrdersByIdService(id);
        if (!delOrders) return c.text("Orders not deleted", 404);
        return c.json(delOrders, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}