"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const jwt = require("jsonwebtoken");
const passport_1 = require("./passport");
exports.login = (ctx) => {
    const payload = {
        profile: {
            id: ctx.state.user.id,
            role: ctx.state.user.role,
            active: ctx.state.user.active,
            name: ctx.state.user.name
        }
    };
    const token = jwt.sign(payload, passport_1.JWT_SECRET, { expiresIn: passport_1.JWT_EXPIRE_IN });
    ctx.body = {
        token,
        expires_in: passport_1.JWT_EXPIRE_IN
    };
};
exports.refresh = (ctx) => {
    const user = db_1.db[ctx.state.user.name];
    const payload = {
        profile: {
            id: user.id,
            role: user.role,
            active: user.active,
            name: user.name
        }
    };
    const token = jwt.sign(payload, passport_1.JWT_SECRET, { expiresIn: passport_1.JWT_EXPIRE_IN });
    ctx.body = {
        token,
        expires_in: passport_1.JWT_EXPIRE_IN
    };
};
//# sourceMappingURL=auth.js.map