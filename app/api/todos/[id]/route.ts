import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const deleted = await Todo.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const todo = await Todo.findById(id);
  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  todo.done = !todo.done;
  await todo.save();

  return NextResponse.json(todo);
}
