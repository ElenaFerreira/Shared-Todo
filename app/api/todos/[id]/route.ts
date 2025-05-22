import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;
  const todo = await Todo.findById(id);
  todo.done = !todo.done;
  await todo.save();
  return NextResponse.json(todo);
}
