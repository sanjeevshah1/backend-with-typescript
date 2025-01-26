import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

//This technique is called Currying
const validate = (schema : AnyZodObject)=> (req: Request,res: Response,next : NextFunction)=>{
    try{
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        next();
    }catch(error : unknown){
        if(error instanceof Error){
            return res.status(400).send(error.message);
        }else{
            return res.status(400).send("Something went wrong");
        }
    }
};

export default validate;