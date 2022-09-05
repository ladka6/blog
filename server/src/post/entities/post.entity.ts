import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/entities/user.entity";

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User'})
  user: User

  @Prop()
  header: String;

  @Prop()
  contet: String;

  @Prop()
  comment: String;

  @Prop()
  date: Date;

  @Prop()
  like: Number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
