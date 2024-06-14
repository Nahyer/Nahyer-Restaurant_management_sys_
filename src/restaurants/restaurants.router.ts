import { Hono } from "hono";
import { ListsRestaurants, CreateRestaurant,
     GetRestaurantById, UpdateRestaurant, DeleteRestaurant} from "./restaurants.controller";
import { restaurantSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { restuRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const restaurantRouter = new Hono().basePath('/restaurant')

restaurantRouter.get("",userRoleAuth,ListsRestaurants);
restaurantRouter.get("/:id", userRoleAuth,GetRestaurantById);
restaurantRouter.post("/create",zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateRestaurant);
restaurantRouter.put("/:id", UpdateRestaurant);
restaurantRouter.delete("/:id", DeleteRestaurant);