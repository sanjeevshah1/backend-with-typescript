import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import Session from "../models/session.model";
import { SessionDocument } from "../types";
import { signinJwt,verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
// import { SessionDocument } from "../types";
export async function createSession(user : string, userAgent: string){  
    console.log("creatSession service executing")
    try{
        const session = await Session.create({
           user , userAgent
        })
        return session;
    }catch(error : unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong while creating session : ${error}`)
    }
}

// export async function deleteSessions(query: FilterQuery<SessionDocument>){
//     console.log("deleteSession service executing")
//     try{
//         const sessions = await Session.deleteMany(query);
//         console.log("the sessions are", sessions)
//         return sessions;
//     }catch(error: unknown){
//         throw new Error(error instanceof Error ? error.message : `Something went wrong while deleting sessions : ${error}`)
//     }
// }
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    console.log("updateSession service executing")
    try{
        const updated = await Session.updateOne(query, update);
        return updated;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong while updating sessions : ${error}`)
    }
}
export async function findSessions(query: FilterQuery<SessionDocument>){
    console.log("findSessions service executing")
    try{
        const sessions = await Session.find(query).lean();
        return sessions;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong while getting sessions : ${error}`)
    }
}

export async function reIssueAccessToken(token: string) : Promise<false | string>{
    console.log("reIssueAccessToken service executing")
    try{
        const {decoded} = verifyJwt(token);
        if(!decoded || !decoded.session) return false;

        const session: SessionDocument | null= await Session.findOne({_id : decoded.session});
        if(!session || !session.valid) return false;

        const userId = session.user as mongoose.Schema.Types.ObjectId;
        const user = await findUser({_id: userId.toString()})
        if(!user) return false;

        const accessToken = signinJwt({...user, session: session._id}, {expiresIn: "1d"});
        return accessToken;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong while reIssuing access token : ${error}`)
    }
}