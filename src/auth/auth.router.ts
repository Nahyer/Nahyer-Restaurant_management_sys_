import {Hono} from "hono"
import { zValidator } from "@hono/zod-validator"
import { loginUserSchema, signupUserSchema } from "../validator"
import { loginUser, signUpUser } from "./auth.controller"

export const authRouter = new Hono().basePath('/auth')

authRouter.post("/sign_up", zValidator('json', signupUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), signUpUser)

authRouter.post("/login", zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)