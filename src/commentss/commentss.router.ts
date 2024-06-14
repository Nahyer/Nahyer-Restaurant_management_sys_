import { Hono } from "hono";
import { ListsCommentss, CreateComments,
     GetCommentsById, UpdateComments, DeleteComments} from "./commentss.controller";
import { commentsSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
import { userRoleAuth } from "../middleware/beareAuth";
export const commentsRouter = new Hono().basePath('/comments')

commentsRouter.get("",userRoleAuth, ListsCommentss);
commentsRouter.get("/:id",userRoleAuth, GetCommentsById);
commentsRouter.post("/create",zValidator('json', commentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),CreateComments);
commentsRouter.put("/:id", UpdateComments);
commentsRouter.delete("/:id", DeleteComments);