import  {Express} from "express";
import { getUserHandler, createUserHandler, deleteUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../schema/user.schema";
import { createSessionSchema} from "../schema/session.schema";
import { createUserSessionHandler } from "../controller/session.controller";

const routes = (app: Express) => {
  
    app.get('/api/users',getUserHandler);
    app.post('/api/users',validate(createUserSchema), createUserHandler);
    app.delete('/api/users',validate(deleteUserSchema), deleteUserHandler);
    app.put('/api/users',validate(updateUserSchema),updateUserHandler);
    app.post('/api/session',validate(createSessionSchema), createUserSessionHandler);
    // app.get('api/session',getSessionHandler);
    // app.delete('api/session',validate(deleteSessionSchema),deleteSessionHandler);
}

export default routes;