import { Hono } from "hono";
import { ListsCategorys, CreateCategory,
     GetCategoryById, UpdateCategory, DeleteCategory} from "./categorys.controller";
import { categorySchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const categoryRouter = new Hono().basePath('/category')

categoryRouter.get("", ListsCategorys);
categoryRouter.get("/:id", GetCategoryById);
categoryRouter.post("/create",zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateCategory);
categoryRouter.put("/:id", UpdateCategory);
categoryRouter.delete("/:id", DeleteCategory);