import {Request, Response} from "express"
import {getUsers,createUser,deleteUser,updateUser} from "../service/user.service";
import { CreateUserInput, DeleteUserInput, UpdateUserSchemaType } from "../schema/user.schema";

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json({
      success: true,
      data: users,
      message: null,
    });
  } catch (error: unknown) {
    // Handle errors and return appropriate status codes
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Something went wrong",
      });
    }
  }
};


export const createUserHandler = async (req: Request<{},{},CreateUserInput["body"]>, res: Response) => {
    try{
        const user = await createUser(req.body);
        return res.status(201).send(user);
    }catch(error : unknown){
        if(error instanceof Error){
            return res.status(409).send(error.message); //409 for conflict
        }
        else{
            return res.status(409).send("Something went wrong");
        }
    }
}

export const deleteUserHandler = async (
    req: Request<{}, {}, DeleteUserInput["body"]>,
    res: Response
  ) => {
    try {
      const deletedUser = await deleteUser(req.body);
      return res.status(200).send(deletedUser);

    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          return res.status(404).send(error.message); // Not Found
        }
        if (error.message === "Password does not match") {
          return res.status(401).send(error.message); // Unauthorized
        }

        return res.status(400).send(error.message); // Bad Request
      } else {
        // Generic fallback for unknown errors
        return res.status(500).send("Something went wrong");
      }
    }
  };
  
export const updateUserHandler = async (req: Request<{},{},UpdateUserSchemaType["body"]>, res: Response)=> {
  try{
    const updatedUser = await updateUser(req.body);
    res.status(200).send(updatedUser);
  }catch(error: unknown){
    if(error instanceof Error){
      const {message} = error;
      if(message === "User not found") return res.status(404).send(message)//not found
      if(message === "Password does not match") return res.status(401).send(message); //unauthorized
      return res.status(400).send(message); //Bad request
    }else{
      return res.status(500).send("Something went wrong") //500 for unknown errors
    }
  }
}