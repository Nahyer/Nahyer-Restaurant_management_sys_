import { Hono } from "hono";
import { ListsDrivers, CreateDriver,
     GetDriverById, UpdateDriver, DeleteDriver} from "./drivers.controller";
import { driverSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const driverRouter = new Hono().basePath('/driver')

driverRouter.get("", ListsDrivers);
driverRouter.get("/:id", GetDriverById);
driverRouter.post("/create",zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateDriver);
driverRouter.put("/:id", UpdateDriver);
driverRouter.delete("/:id", DeleteDriver);