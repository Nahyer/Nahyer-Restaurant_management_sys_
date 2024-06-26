import { Hono } from "hono";
import { ListsCategorys, CreateCategory,
     GetCategoryById, UpdateCategory, DeleteCategory} from "./categorys.controller";
import { categorySchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const categoryRouter = new Hono().basePath('/category')

categoryRouter.get("",userRoleAuth, ListsCategorys);
categoryRouter.get("/:id",userRoleAuth, GetCategoryById);
categoryRouter.post("/create",zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),adminRoleAuth,CreateCategory);
categoryRouter.put("/:id",adminRoleAuth,UpdateCategory);
categoryRouter.delete("/:id", adminRoleAuth,DeleteCategory);