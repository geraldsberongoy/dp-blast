import type { APIRoute } from "astro";

export const GET: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "DP Blast backend is working",
      method: request.method,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
