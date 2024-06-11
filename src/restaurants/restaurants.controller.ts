import { Context } from "hono";
import { getRestaurantsService, createRestaurantService, getRestaurantByIdService, updateRestaurantService, DeleteRestaurantByIdService } from "./restaurants.service";


export const ListsRestaurants = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getRestaurantsService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetRestaurantById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const restaurant = await getRestaurantByIdService(id);
        if(!restaurant) return c.json({ message: "restaurant not found"},404);
        return c.json(restaurant);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateRestaurant = async(c: Context) => {
    try {
        const restaurant = await c.req.json();
        restaurant.created_at = new Date();
        const newRestaurant = await createRestaurantService(restaurant);
        if(!newRestaurant) return c.json({ message: "Unable to create"},404);
        return c.json(newRestaurant, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateRestaurant = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Urestaurant = await getRestaurantByIdService(id);
        if (!Urestaurant) return c.text("Restaurant not found", 404);
        const restaurant = await c.req.json();
        const upRestaurant = await updateRestaurantService(id, restaurant);
        if (!upRestaurant) return c.text("Restaurant not updated", 404);
        return c.json(upRestaurant, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteRestaurant = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DRestaurant = await getRestaurantByIdService(id);
    if (!DRestaurant) return c.text("Restaurant not found", 404);
        const delRestaurant = await DeleteRestaurantByIdService(id);
        if (!delRestaurant) return c.text("Restaurant not deleted", 404);
        return c.json(delRestaurant, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}