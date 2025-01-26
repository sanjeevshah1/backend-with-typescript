import  {Express, Request, Response} from "express";
import { getUserHandler, createUserHandler, deleteUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../schema/user.schema";
import { createSessionSchema} from "../schema/session.schema";
import { createUserSessionHandler } from "../controller/session.controller";
import config from 'config';
// const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const routes = (app: Express) => {
    app.get('/healthcheck', (req : Request, res: Response) => {
        return res.status(200).send({
            private : config.get<string>('privateKey')
        });
    });
    app.get('/api/users',getUserHandler);
    app.post('/api/users',validate(createUserSchema), createUserHandler);
    app.delete('/api/users',validate(deleteUserSchema), deleteUserHandler);
    app.put('/api/users',validate(updateUserSchema),updateUserHandler);
    app.post('/api/session',validate(createSessionSchema), createUserSessionHandler);
    // app.get('api/session',getSessionHandler);
    // app.delete('api/session',validate(deleteSessionSchema),deleteSessionHandler);
}

export default routes;