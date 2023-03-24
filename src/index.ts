import * as jose from "jose";
import webpage from "./webpage";

export interface Env {
  APPLE_DEV_TEAM_ID: string;
  APPLE_AUTH_KEY_ID: string;
  APPLE_AUTH_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
  ): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/get-dev-token") {
			const alg = "ES256";
      const pkcs8 = env.APPLE_AUTH_KEY;
      const ecPrivateKey = await jose.importPKCS8(pkcs8, alg);

			const jwt = await new jose.SignJWT({ origin: ["https://raycast-music-login.gbgk.dev"] }) 
        .setProtectedHeader({ alg, kid: env.APPLE_AUTH_KEY_ID })
        .setIssuedAt()
        .setIssuer(env.APPLE_DEV_TEAM_ID)
        .setExpirationTime("2d")
        .sign(ecPrivateKey);

			return new Response(JSON.stringify({ token: jwt, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) }));
		}

		if (url.pathname === "/") {
			return new Response(webpage, {
				headers: {
					"content-type": "text/html",
				},
			});
		}

    return new Response("Hello World!");
  },
};
