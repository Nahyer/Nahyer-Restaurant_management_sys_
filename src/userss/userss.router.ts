import { Hono } from "hono";
import { ListsUserss, CreateUsers,
     GetUsersById, UpdateUsers, DeleteUsers,
     UpdateUserRole} from "./userss.controller";
import { updateRoleSchema, usersSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";
export const usersRouter = new Hono().basePath('/users')

usersRouter.get("", ListsUserss);
usersRouter.get("/:id", GetUsersById);
usersRouter.post("/create",zValidator('json', usersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateUsers);
usersRouter.put("/:id", UpdateUsers)

usersRouter.delete("/:id", DeleteUsers);
