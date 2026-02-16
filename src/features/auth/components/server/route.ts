import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../../schemas";

const app = new Hono()
  .post(
    "/login",
    zValidator("json", loginSchema),
    async (c) => {
      const { email, password } = c.req.valid("json");
      if (!email || !password) {
        return c.json({ success: false, message: "Invalid email or password" }, 400);
      }
      return c.json({ success: true, email, password });
    },
  )
  .post(
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
      const { email, password, name } = c.req.valid("json");
      return c.json({ success: true, email, password, name });
    },
  );

export default app;