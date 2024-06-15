import { Hono } from "hono";
import { ListsStatus_catalogs, CreateStatus_catalog,
     GetStatus_catalogById, UpdateStatus_catalog, DeleteStatus_catalog} from "./status_catalogs.controller";
import { status_catalogSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const status_catalogRouter = new Hono().basePath('/status_catalog')

status_catalogRouter.get("",userRoleAuth, ListsStatus_catalogs);
status_catalogRouter.get("/:id",userRoleAuth, GetStatus_catalogById);
status_catalogRouter.post("/create",zValidator('json', status_catalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),adminRoleAuth,CreateStatus_catalog);
status_catalogRouter.put("/:id",adminRoleAuth, UpdateStatus_catalog);
status_catalogRouter.delete("/:id",adminRoleAuth,DeleteStatus_catalog);