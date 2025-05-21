import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const todo = await Todo.findById(params.id);
  todo.done = !todo.done;
  await todo.save();
  return NextResponse.json(todo);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Todo.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
