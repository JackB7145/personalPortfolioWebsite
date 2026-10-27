import type { NextRequest } from 'next/server';

type Handler<Req extends Request> = (req: Req) => Promise<Response> | Response;

/**
 * Wraps an App Router route handler so every request writes one structured
 * JSON log line (visible in Vercel → Logs): route, method, path, status,
 * duration, and Vercel's request id. Uncaught errors are logged with their
 * stack and turned into a generic 500. Reading the request makes the route
 * dynamic, so cached GET routes still run (and log) on every hit; upstream
 * fetches keep their own `next.revalidate` caching.
 *
 * Deliberately never logs request bodies, query strings, or client IPs —
 * the contact form and chatbot carry visitors' personal data.
 */
export function withRequestLogging<Req extends Request = NextRequest>(
  route: string,
  handler: Handler<Req>
) {
  return async (req: Req): Promise<Response> => {
    const start = Date.now();
    const base = {
      type: 'api_request',
      route,
      method: req.method,
      path: new URL(req.url).pathname,
      requestId: req.headers.get('x-vercel-id') ?? undefined,
    };

    try {
      const res = await handler(req);
      const entry = { ...base, status: res.status, durationMs: Date.now() - start };
      const line = JSON.stringify(entry);
      if (res.status >= 500) console.error(line);
      else if (res.status >= 400) console.warn(line);
      else console.log(line);
      return res;
    } catch (err) {
      console.error(
        JSON.stringify({
          ...base,
          status: 500,
          durationMs: Date.now() - start,
          error: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined,
        })
      );
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}

/** Logs a handled error inside a route without leaking it to the client. */
export function logRouteError(route: string, err: unknown) {
  console.error(
    JSON.stringify({
      type: 'api_error',
      route,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
  );
}
