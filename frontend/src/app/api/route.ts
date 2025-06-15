import { NextRequest , NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //@ts-expect-error Hosting Issue
  const geo = request.geo || {};
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  return NextResponse.json({
    geoLocation: geo,
    ip: ip,
  });
}