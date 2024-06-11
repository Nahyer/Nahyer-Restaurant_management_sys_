import "dotenv/config"
import { verify } from "hono/jwt"
import { Context, Next} from "hono"

export const verifyToken = async (token: string , secret: string) => {
    try{
        const decoded = await verify(token, secret);
        return decoded;
    }catch(e: any){
        return null;
    }
}

export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");
    if(!token)return c.json({error:"No token provided"}, 401);
    let secret = process.env.JWT_SECRET;
    const decoded = await verifyToken(token, secret!);
    if(!decoded)return c.json({error:"Invalid token"}, 401);
    if(decoded.role !== requiredRole)return c.json({error:"Unauthorized"}, 401);
    return next();
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");
