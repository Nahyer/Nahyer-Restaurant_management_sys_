import { Hono } from "hono";
import { ListsOrderss, CreateOrders,
     GetOrdersById, UpdateOrders, DeleteOrders} from "./orderss.controller";
import { ordersSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const ordersRouter = new Hono().basePath('/orders')

ordersRouter.get("", ListsOrderss);
ordersRouter.get("/:id", GetOrdersById);
ordersRouter.post("/create",zValidator('json', ordersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateOrders);
ordersRouter.put("/:id", UpdateOrders);
ordersRouter.delete("/:id", DeleteOrders);