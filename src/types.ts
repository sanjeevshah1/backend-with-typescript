import mongoose from "mongoose";

export interface UserInput{
    email: string;
    password: string;
    name: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt : Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string) : Promise<boolean>;
}

export interface UserDeleteInput{
    email : string;
    password : string;
}