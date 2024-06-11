import { Context } from "hono";
import { getCategorysService, createCategoryService, getCategoryByIdService, updateCategoryService, DeleteCategoryByIdService } from "./categorys.service";


export const ListsCategorys = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await getCategorysService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const GetCategoryById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const category = await getCategoryByIdService(id);
        if(!category) return c.json({ message: "category not found"},404);
        return c.json(category);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const CreateCategory = async(c: Context) => {
    try {
        const category = await c.req.json();
        category.created_at = new Date();
        const newCategory = await createCategoryService(category);
        if(!newCategory) return c.json({ message: "Unable to create"},404);
        return c.json(newCategory, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const UpdateCategory = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const Ucategory = await getCategoryByIdService(id);
        if (!Ucategory) return c.text("Category not found", 404);
        const category = await c.req.json();
        const upCategory = await updateCategoryService(id, category);
        if (!upCategory) return c.text("Category not updated", 404);
        return c.json(upCategory, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const DeleteCategory = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const DCategory = await getCategoryByIdService(id);
    if (!DCategory) return c.text("Category not found", 404);
        const delCategory = await DeleteCategoryByIdService(id);
        if (!delCategory) return c.text("Category not deleted", 404);
        return c.json(delCategory, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}