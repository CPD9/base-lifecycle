import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME } from "../../constants";
import { ID } from "node-appwrite";

const app = new Hono()
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
    async (c) => {
      const { account } = await createAdminClient();
      await account.deleteSession("current");
      deleteCookie(c, AUTH_COOKIE_NAME);
      return c.json({ success: true });
    },
  );

export default app;