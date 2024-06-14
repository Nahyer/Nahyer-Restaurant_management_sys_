import { Hono } from "hono";
import { ListsOrder_statuss, CreateOrder_status,
     GetOrder_statusById, UpdateOrder_status, DeleteOrder_status} from "./order_statuss.controller";
import { order_statusSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { userRoleAuth } from "../middleware/beareAuth";
export const order_statusRouter = new Hono().basePath('/order_status')

order_statusRouter.get("",userRoleAuth, ListsOrder_statuss);
order_statusRouter.get("/:id",userRoleAuth, GetOrder_statusById);
order_statusRouter.post("/create",zValidator('json', order_statusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateOrder_status);
order_statusRouter.put("/:id", UpdateOrder_status);
order_statusRouter.delete("/:id", DeleteOrder_status);