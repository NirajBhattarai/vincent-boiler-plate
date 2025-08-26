import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from Vincent Boilerplate API!",
    timestamp: new Date().toISOString(),
    status: "success"
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: "Hello from Vincent Boilerplate API!",
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: "success"
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Invalid JSON in request body",
        status: "error"
      },
      { status: 400 }
    );
  }
}
