import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const deleted = await Todo.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const todo = await Todo.findById(params.id);
  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  todo.done = !todo.done;
  await todo.save();

  return NextResponse.json(todo);
}
