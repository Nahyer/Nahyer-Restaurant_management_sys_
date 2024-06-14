import { Context } from "hono";
import { getUserssService, createUsersService, getUsersByIdService, updateUserService,
     DeleteUsersByIdService, updateUserRoleService} from "./userss.service";
import bcrypt from "bcrypt";

export const ListsUserss = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getUserssService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetUsersById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const users = await getUsersByIdService(id);
        if(!users) return c.json({ message: "users not found"},404);
        return c.json(users);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateUsers = async(c: Context) => {
    try {
        const users = await c.req.json();
        users.created_at = new Date();
        const passw = users.password;
        const hashedPassword = await bcrypt.hash(passw, 10);
        users.password = hashedPassword;
        const newUsers = await createUsersService(users);
        if(!newUsers) return c.json({ message: "Unable to create"},404);
        return c.json(newUsers, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateUsers = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uusers = await getUsersByIdService(id);
        if (!Uusers) return c.text("Users not found", 404);
        const users = await c.req.json();
        const upUsers = await updateUserService(id, users);
        if (!upUsers) return c.text("Users not updated", 404);
        return c.json(upUsers, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteUsers = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DUsers = await getUsersByIdService(id);
    if (!DUsers) return c.text("Users not found", 404);
        const delUsers = await DeleteUsersByIdService(id);
        if (!delUsers) return c.text("Users not deleted", 404);
        return c.json(delUsers, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const UpdateUserRole = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Uusers = await getUsersByIdService(id);
        if (!Uusers) return c.text("Users not found", 404);
        const authrole = await c.req.json();
        const hashedPassword = await bcrypt.hash(authrole.password, 10);
        authrole.password = hashedPassword;
        const upUsers = await updateUserRoleService(id, authrole);
        console.log(upUsers);
        if (!upUsers) return c.text("Users not updated", 404);
        return c.json(upUsers, 201);

    } catch (error: any) {
        return c.json({ message: error.message, haaa: "hahah"});
    }
}
