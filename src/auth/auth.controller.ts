import "dotenv/config"
import { Context } from "hono"
import { userLoginService ,createAuthUserService } from "./auth.service"
import bcrypt from "bcrypt"
import { sign } from "hono/jwt"

export const signUpUser = async (c: Context) => {
    try{
        const user = await c.req.json();
        const passw = user.password;
        const hashedPassword = await bcrypt.hash(passw, 10);
        user.password = hashedPassword;
        const cUser = await createAuthUserService(user);
        if(!cUser)return c.json("User not created", 404);
        return c.json({msg: cUser}, 201);
    }catch(e: any){
        return c.json(e?.message, 400)
    }
}

export const loginUser = async (c: Context) => {
    try{
        const user = await c.req.json();
        const lUser = await userLoginService(user);
        if(!lUser || lUser === null)return c.json({error:"User not found"}, 404);
        const match = await bcrypt.compare(user.password, lUser?.password!);
        if(!match){
            return c.json({error:"Invalid Credetials"}, 401)
        }else{

            const payload = {
                sub: lUser?.users.id,
                role: lUser?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)
            }
            let secret = process.env.JWT_SECRET;
            const token = await sign(payload, secret!);
            let user = lUser?.users;
            let role = lUser?.role;
            return c.json({token, user:{role, ...user}}, 200);
        }
    }catch(e: any){
        return c.json(e?.message, 400)
    }
}

