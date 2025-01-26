import  {Express, Request, Response} from "express";
import { getUserHandler, createUserHandler, deleteUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../schema/user.schema";
const routes = (app: Express) => {
    app.get('/healthcheck', (req : Request, res: Response) => {
        return res.status(200).send("OK");
    });
    app.get('/api/users',getUserHandler);
    app.post('/api/users',validate(createUserSchema), createUserHandler);
    app.delete('/api/users',validate(deleteUserSchema), deleteUserHandler);
    app.put('/api/users',validate(updateUserSchema),updateUserHandler)
}

export default routes;