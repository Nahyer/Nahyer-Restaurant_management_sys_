import { Hono } from "hono";
import { ListsOrder_menu_items, CreateOrder_menu_item,
     GetOrder_menu_itemById, UpdateOrder_menu_item, DeleteOrder_menu_item} from "./order_menu_items.controller";
import { order_menu_itemSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const order_menu_itemRouter = new Hono().basePath('/order_menu_item')

order_menu_itemRouter.get("", ListsOrder_menu_items);
order_menu_itemRouter.get("/:id", GetOrder_menu_itemById);
order_menu_itemRouter.post("/create",zValidator('json', order_menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateOrder_menu_item);
order_menu_itemRouter.put("/:id", UpdateOrder_menu_item);
order_menu_itemRouter.delete("/:id", DeleteOrder_menu_item);