import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return Response.error();
  }

  try {
    const { currentUser } = await serverAuth();
    // console.log("API:CURRENT:ROUTE:currentUser", currentUser);
    return Response.json(currentUser);
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}