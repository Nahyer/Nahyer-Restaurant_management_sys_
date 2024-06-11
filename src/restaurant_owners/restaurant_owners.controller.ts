import { Context } from "hono";
import { getRestaurant_ownersService, createRestaurant_ownerService, getRestaurant_ownerByIdService, updateRestaurant_ownerService, DeleteRestaurant_ownerByIdService } from "./restaurant_owners.service";


export const ListsRestaurant_owners = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getRestaurant_ownersService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetRestaurant_ownerById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const restaurant_owner = await getRestaurant_ownerByIdService(id);
        if(!restaurant_owner) return c.json({ message: "restaurant_owner not found"},404);
        return c.json(restaurant_owner);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateRestaurant_owner = async(c: Context) => {
    try {
        const restaurant_owner = await c.req.json();
        restaurant_owner.created_at = new Date();
        const newRestaurant_owner = await createRestaurant_ownerService(restaurant_owner);
        if(!newRestaurant_owner) return c.json({ message: "Unable to create"},404);
        return c.json(newRestaurant_owner, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateRestaurant_owner = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Urestaurant_owner = await getRestaurant_ownerByIdService(id);
        if (!Urestaurant_owner) return c.text("Restaurant_owner not found", 404);
        const restaurant_owner = await c.req.json();
        const upRestaurant_owner = await updateRestaurant_ownerService(id, restaurant_owner);
        if (!upRestaurant_owner) return c.text("Restaurant_owner not updated", 404);
        return c.json(upRestaurant_owner, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteRestaurant_owner = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DRestaurant_owner = await getRestaurant_ownerByIdService(id);
    if (!DRestaurant_owner) return c.text("Restaurant_owner not found", 404);
        const delRestaurant_owner = await DeleteRestaurant_ownerByIdService(id);
        if (!delRestaurant_owner) return c.text("Restaurant_owner not deleted", 404);
        return c.json(delRestaurant_owner, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}