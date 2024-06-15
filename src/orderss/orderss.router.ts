import { Hono } from "hono";
import { ListsOrderss, CreateOrders,
     GetOrdersById, UpdateOrders, DeleteOrders} from "./orderss.controller";
import { ordersSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const ordersRouter = new Hono().basePath('/orders')

ordersRouter.get("",userRoleAuth, ListsOrderss);
ordersRouter.get("/:id",userRoleAuth,GetOrdersById);
ordersRouter.post("/create",zValidator('json', ordersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),userRoleAuth,CreateOrders);
ordersRouter.put("/:id",adminRoleAuth, UpdateOrders);
ordersRouter.delete("/:id",adminRoleAuth, DeleteOrders);