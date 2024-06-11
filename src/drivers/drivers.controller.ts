import { Context } from "hono";
import { getDriversService, createDriverService, getDriverByIdService, updateDriverService, DeleteDriverByIdService } from "./drivers.service";


export const ListsDrivers = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getDriversService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetDriverById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const driver = await getDriverByIdService(id);
        if(!driver) return c.json({ message: "driver not found"},404);
        return c.json(driver);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateDriver = async(c: Context) => {
    try {
        const driver = await c.req.json();
        driver.created_at = new Date();
        const newDriver = await createDriverService(driver);
        if(!newDriver) return c.json({ message: "Unable to create"},404);
        return c.json(newDriver, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateDriver = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Udriver = await getDriverByIdService(id);
        if (!Udriver) return c.text("Driver not found", 404);
        const driver = await c.req.json();
        const upDriver = await updateDriverService(id, driver);
        if (!upDriver) return c.text("Driver not updated", 404);
        return c.json(upDriver, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteDriver = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DDriver = await getDriverByIdService(id);
    if (!DDriver) return c.text("Driver not found", 404);
        const delDriver = await DeleteDriverByIdService(id);
        if (!delDriver) return c.text("Driver not deleted", 404);
        return c.json(delDriver, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}