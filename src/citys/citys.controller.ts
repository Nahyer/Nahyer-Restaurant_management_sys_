import { Context } from "hono";
import { getCitysService, createCityService, getCityByIdService, updateCityService, DeleteCityByIdService } from "./citys.service";


export const ListsCitys = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getCitysService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetCityById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const city = await getCityByIdService(id);
        if(!city) return c.json({ message: "city not found"},404);
        return c.json(city);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateCity = async(c: Context) => {
    try {
        const city = await c.req.json();
        city.created_at = new Date();
        const newCity = await createCityService(city);
        if(!newCity) return c.json({ message: "Unable to create"},404);
        return c.json(newCity, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateCity = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Ucity = await getCityByIdService(id);
        if (!Ucity) return c.text("City not found", 404);
        const city = await c.req.json();
        const upCity = await updateCityService(id, city);
        if (!upCity) return c.text("City not updated", 404);
        return c.json(upCity, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteCity = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DCity = await getCityByIdService(id);
    if (!DCity) return c.text("City not found", 404);
        const delCity = await DeleteCityByIdService(id);
        if (!delCity) return c.text("City not deleted", 404);
        return c.json(delCity, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}