import os from "node:os";

/**
 * Send misskey note
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const visibility = searchParams.get("visibility");
  const instance = searchParams.get("instance");
  const token = searchParams.get("token");

  if (text != null && visibility != null && instance != null && token != null) {
    const url = new URL("/api/notes/create", `https://${instance}`);
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = {
      i: token,
      text: text.replace("\\n", os.EOL),
      visibility: visibility,
    };
    const request = new Request(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    try {
      const response = await fetch(request);
      if (response.ok) {
        return Response.json({
          message: "Note Success",
          text: text,
          visibility: visibility,
        });
      } else {
        return Response.json(
          { error: response.statusText },
          { status: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } else {
    return Response.json({ error: "Query required" }, { status: 400 });
  }
}
