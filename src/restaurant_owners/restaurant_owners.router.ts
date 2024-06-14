import { Hono } from "hono";
import { ListsRestaurant_owners, CreateRestaurant_owner,
     GetRestaurant_ownerById, UpdateRestaurant_owner, DeleteRestaurant_owner} from "./restaurant_owners.controller";
import { restaurant_ownerSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { userRoleAuth } from "../middleware/beareAuth";
export const restaurant_ownerRouter = new Hono().basePath('/restaurant_owner')

restaurant_ownerRouter.get("",userRoleAuth, ListsRestaurant_owners);
restaurant_ownerRouter.get("/:id",userRoleAuth, GetRestaurant_ownerById);
restaurant_ownerRouter.post("/create",zValidator('json', restaurant_ownerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateRestaurant_owner);
restaurant_ownerRouter.put("/:id", UpdateRestaurant_owner);
restaurant_ownerRouter.delete("/:id", DeleteRestaurant_owner);