import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME } from "../constants";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";


const app = new Hono()
  .get(
    "/current",
    sessionMiddleware,
    (c) => {
      const user = c.get("user");
    
      return c.json({ success: true, data: user });
    }
  )
  .post(
    "/login",
    zValidator("json", loginSchema),
    async (c) => {
      const { email, password } = c.req.valid("json");
      if (!email || !password) {
        return c.json({ success: false, message: "Invalid email or password" }, 400);
      }
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE_NAME, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ success: true, email, password });
    },
  )
  .post(
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
      const { email, password, name } = c.req.valid("json");
      const { account } = await createAdminClient();
      await account.create(
        ID.unique(),
        email,
        password,
        name,
      )

      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE_NAME, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true, email, password, name });
    },
  )

  .post(
    "/logout",
    sessionMiddleware,
    async (c) => {
      const account = c.get("account");
      deleteCookie(c, AUTH_COOKIE_NAME);
      await account.deleteSession("current");
      return c.json({ success: true });
    },
  );

export default app;