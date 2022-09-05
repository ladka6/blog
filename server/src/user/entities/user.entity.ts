import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "src/post/entities/post.entity";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: Number;

  @Prop()
  username: String;

  @Prop()
  password: String;

  @Prop()
  email: String

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]})
  posts: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser {
  id: Number;
  username: String;
  password: String;
  email: String;
  posts: Post[];
}