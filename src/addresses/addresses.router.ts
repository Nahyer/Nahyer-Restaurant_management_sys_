import { Hono } from "hono";
import { ListsAddresss, CreateAddress,
     GetAddressById, UpdateAddress, DeleteAddress} from "./addresses.controller";
import { addressSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const addressRouter = new Hono().basePath('/address')

addressRouter.get("", ListsAddresss);
addressRouter.get("/:id", GetAddressById);
addressRouter.post("/create",zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateAddress);
addressRouter.put("/:id", UpdateAddress);
addressRouter.delete("/:id", DeleteAddress);