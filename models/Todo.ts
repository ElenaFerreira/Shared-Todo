import mongoose, { Schema, models, model } from "mongoose";

const TodoSchema = new Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = models.Todo || model("Todo", TodoSchema);
