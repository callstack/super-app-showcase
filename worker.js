// Check requests for a pre-shared secret
const hasValidHeader = (request, env) => {
  return request.headers.get("X-Custom-Auth-Key") === env.AUTH_KEY_SECRET;
};

function authorizeRequest(request, env, key) {
  switch (request.method) {
    case "PUT":
    case "DELETE":
      return hasValidHeader(request, env);
    case "GET":
      return true;
    default:
      return false;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (!authorizeRequest(request, env, key)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (request.method == "PUT") {
      await env.MY_BUCKET.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
    }

    if (request.method == "GET") {
      const value = await env.MY_BUCKET.get(key);

      if (value === null) {
        return new Response("Object Not Found", { status: 404 });
      }

      return new Response(value.body);
    }
  },
};
