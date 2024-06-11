import { Hono } from "hono";
import { ListsCitys, CreateCity,
     GetCityById, UpdateCity, DeleteCity} from "./citys.controller";
import { citySchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const cityRouter = new Hono().basePath('/city')

cityRouter.get("", ListsCitys);
cityRouter.get("/:id", GetCityById);
cityRouter.post("/create",zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateCity);
cityRouter.put("/:id", UpdateCity);
cityRouter.delete("/:id", DeleteCity);