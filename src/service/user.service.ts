import { UserDeleteInput, UserInput } from "../types";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import config from "config"
import { UpdateUserSchemaType } from "../schema/user.schema";

export async function getUsers(){
    try{
      return await User.find();
    }catch(error : unknown){
      if(error instanceof Error){
          throw new Error(error.message);
      }
      else{
          throw new Error("Something went wrong");
      }
  }
}

export async function createUser(input: UserInput){
    try{
         return await User.create(input);
    }catch(error : unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else{
            throw new Error("Something went wrong");
        }
    }
}

export async function deleteUser(input: UserDeleteInput) {
  try {
    const user = await User.findOne({ email: input.email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(input.password);
    if (!isMatch) throw new Error("Password does not match");

    return await User.deleteOne({ email: input.email });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function updateUser(input : UpdateUserSchemaType["body"]){
  try{
    const user = await User.findOne({email : input.email});
    if(!user) throw new Error("User not found");

    const isMatch =await user.comparePassword(input.password);
    if(!isMatch) throw new Error("Password does not match");

    if(input.updates.password){
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
      const hash = bcrypt.hashSync(input.updates.password,salt);
      input.updates.password = hash;
    }

    const updatedUser = await User.updateOne({email : input.email},input.updates)
    return updatedUser;
    
  }catch(error){
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
