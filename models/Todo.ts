import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    taskId: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    categoryId: { type: String, required: true, default: 1 },
  },
  { timestamps: true }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
