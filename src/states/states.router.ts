import { Hono } from "hono";
import { ListsStates, CreateState,
     GetStateById, UpdateState, DeleteState} from "./states.controller";
import { adminRoleAuth, userRoleAuth } from "../middleware/beareAuth";

export const statesRouter = new Hono().basePath('/states')

statesRouter.get("/",userRoleAuth, ListsStates);
statesRouter.get("/:id",userRoleAuth, GetStateById);
statesRouter.post("/create",adminRoleAuth, CreateState);
statesRouter.put("/:id",adminRoleAuth, UpdateState);
statesRouter.delete("/:id",adminRoleAuth, DeleteState);
