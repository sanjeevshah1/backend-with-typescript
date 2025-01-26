import Session from "../models/session.model";
// import { SessionDocument } from "../types";
export async function createSession(user : string, userAgent: string){  
    try{
        const session = await Session.create({
           user , userAgent
        })
        return session;
    }catch(error : unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("Something went wrong");
        }
    }
}
export async function deleteSession(){

}
export async function updateSession(){

}
export async function getSessions(){

}