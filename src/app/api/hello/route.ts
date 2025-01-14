"use server";

import { embedQuery } from "@/lib/embedding";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";

// 定义请求体的接口
interface PostRequestBody {
  name: string;
}

// 处理 GET 请求
export async function GET(request: NextRequest): Promise<NextResponse> {
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    model: "qwen2.5:7b",
    configuration: {
      baseURL: "http://127.0.0.1:11434",
    },
  });

  const resp = await embeddings.embedQuery("hello");
  return NextResponse.json({ message: resp }, { status: 200 });
}

// 处理 POST 请求
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 解析请求体
    const body: PostRequestBody = await request.json();

    // 校验请求体中的数据
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required in the body!" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: `Hello, ${body.name}!` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON format!" },
      { status: 400 },
    );
  }
}
