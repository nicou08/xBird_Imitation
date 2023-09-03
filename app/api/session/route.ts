import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOpt";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
  
    return NextResponse.json({
      authenticated: !!session,
      session,
    });
  }