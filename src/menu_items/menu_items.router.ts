import { Hono } from "hono";
import { ListsMenu_items, CreateMenu_item,
     GetMenu_itemById, UpdateMenu_item, DeleteMenu_item} from "./menu_items.controller";
import { menu_itemSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { userRoleAuth } from "../middleware/beareAuth";
export const menu_itemRouter = new Hono().basePath('/menu_item')

menu_itemRouter.get("",userRoleAuth, ListsMenu_items);
menu_itemRouter.get("/:id",userRoleAuth, GetMenu_itemById);
menu_itemRouter.post("/create",zValidator('json', menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateMenu_item);
menu_itemRouter.put("/:id", UpdateMenu_item);
menu_itemRouter.delete("/:id", DeleteMenu_item);