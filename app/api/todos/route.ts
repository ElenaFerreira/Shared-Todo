import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const todos = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await connectDB();
  const { text } = await req.json();
  const newTodo = await Todo.create({ text });
  return NextResponse.json(newTodo);
}
