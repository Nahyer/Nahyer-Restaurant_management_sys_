import { Context } from "hono";
import { getCommentssService, createCommentsService, getCommentsByIdService, updateCommentsService, DeleteCommentsByIdService } from "./commentss.service";


export const ListsCommentss = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getCommentssService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetCommentsById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const comments = await getCommentsByIdService(id);
        if(!comments) return c.json({ message: "comments not found"},404);
        return c.json(comments);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateComments = async(c: Context) => {
    try {
        const comments = await c.req.json();
        comments.created_at = new Date();
        const newComments = await createCommentsService(comments);
        if(!newComments) return c.json({ message: "Unable to create"},404);
        return c.json(newComments, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateComments = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Ucomments = await getCommentsByIdService(id);
        if (!Ucomments) return c.text("Comments not found", 404);
        const comments = await c.req.json();
        const upComments = await updateCommentsService(id, comments);
        if (!upComments) return c.text("Comments not updated", 404);
        return c.json(upComments, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteComments = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DComments = await getCommentsByIdService(id);
    if (!DComments) return c.text("Comments not found", 404);
        const delComments = await DeleteCommentsByIdService(id);
        if (!delComments) return c.text("Comments not deleted", 404);
        return c.json(delComments, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}