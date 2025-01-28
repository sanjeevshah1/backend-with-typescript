import {Request, Response} from "express"
import { createSession } from "../service/session.service"
import { validateUserPassword } from "../service/user.service"
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) : Promise<void>{ 
    //1. Validate the user password.

    const validatedUser =await validateUserPassword(req.body);
    if(!validatedUser) res.status(401).send("Invalid email or password");

    //2. Create the session.
        const session = await createSession(validatedUser._id, req.get("user-agent") || "");

    //3. Generate access token.
    const publicKey = config.get<string>("publicKey");
    const privateKey = config.get<string>("privateKey");

    //4. Generate referesh token.
    
    //5. Send access token and refresh token in the response
    const tokens = {
        accessToken,
        refreshToken
    }
    return res.status(201).send(tokens);
}