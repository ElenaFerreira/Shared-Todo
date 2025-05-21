import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: any) {
  await connectDB();

  try {
    const id = context.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    todo.done = !todo.done;
    await todo.save();

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  await connectDB();

  try {
    const id = context.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await Todo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
