import { db } from "./db";
import * as jwt from "jsonwebtoken";
import { Context } from "koa";
import { JWT_SECRET, JWT_EXPIRE_IN } from "./passport";

export const login = (ctx: Context) => {
  const payload = {
    profile: {
      id: ctx.state.user.id,
      role: ctx.state.user.role,
      active: ctx.state.user.active,
      name: ctx.state.user.name
    }
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN })

  ctx.body = {
    token,
    expires_in: JWT_EXPIRE_IN
  };
};

export const refresh = (ctx: Context) => {
  const user = db[ctx.state.user.name];

  const payload = {
    profile: {
      id: user.id,
      role: user.role,
      active: user.active,
      name: user.name
    }
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN })

  ctx.body = {
    token,
    expires_in: JWT_EXPIRE_IN
  };
};
