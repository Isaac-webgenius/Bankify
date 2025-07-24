import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionSecret } = body;

    if (!sessionSecret) {
      return NextResponse.json({ error: "Missing session secret" }, { status: 400 });
    }

    cookies().set("appwrite-session", sessionSecret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true, // set to true only on HTTPS
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cookie API error:", error);
    return NextResponse.json({ error: "Failed to set cookie" }, { status: 500 });
  }
}
