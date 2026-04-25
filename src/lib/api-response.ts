export function apiPlaceholder(route: string, methods: string[]) {
  return Response.json({
    route,
    status: "not-implemented",
    methods,
  });
}