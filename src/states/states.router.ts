import { Hono } from "hono";
import { ListsStates, CreateState,
     GetStateById, UpdateState, DeleteState} from "./states.controller";

export const statesRouter = new Hono().basePath('/states')

statesRouter.get("/", ListsStates);
statesRouter.get("/:id", GetStateById);
statesRouter.post("/create", CreateState);
statesRouter.put("/:id", UpdateState);
statesRouter.delete("/:id", DeleteState);
