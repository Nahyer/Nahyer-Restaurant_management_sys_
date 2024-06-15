import { Hono } from "hono";
import { ListsCitys, CreateCity,
     GetCityById, UpdateCity, DeleteCity} from "./citys.controller";
import { citySchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const cityRouter = new Hono().basePath('/city')

cityRouter.get("",userRoleAuth, ListsCitys);
cityRouter.get("/:id",userRoleAuth, GetCityById);
cityRouter.post("/create",zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),adminRoleAuth,CreateCity);
cityRouter.put("/:id", adminRoleAuth,UpdateCity);
cityRouter.delete("/:id",adminRoleAuth, DeleteCity);