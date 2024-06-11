import { Context } from "hono";
import { getAddresssService, createAddressService, getAddressByIdService, updateAddressService, DeleteAddressByIdService } from "./addresses.service";


export const ListsAddresss = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getAddresssService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetAddressById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const address = await getAddressByIdService(id);
        if(!address) return c.json({ message: "address not found"},404);
        return c.json(address);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateAddress = async(c: Context) => {
    try {
        const address = await c.req.json();
        address.created_at = new Date();
        const newAddress = await createAddressService(address);
        if(!newAddress) return c.json({ message: "Unable to create"},404);
        return c.json(newAddress, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateAddress = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uaddress = await getAddressByIdService(id);
        if (!Uaddress) return c.text("Address not found", 404);
        const address = await c.req.json();
        address.updated_at = new Date();
        const upAddress = await updateAddressService(id, address);
        if (!upAddress) return c.text("Address not updated", 404);
        return c.json(upAddress, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteAddress = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DAddress = await getAddressByIdService(id);
    if (!DAddress) return c.text("Address not found", 404);
        const delAddress = await DeleteAddressByIdService(id);
        if (!delAddress) return c.text("Address not deleted", 404);
        return c.json(delAddress, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}