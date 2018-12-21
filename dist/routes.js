"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_1 = require("./auth");
const passport_1 = require("./passport");
var router = new Router();
router.get('/data/public', (ctx, next) => {
    ctx.body = `This is a publicly available data`;
});
router.get('/data/private', passport_1.default.authenticate('jwt'), (ctx, next) => {
    ctx.body = `This is a secret available only to a few chosen`;
});
router.post('/auth/login', passport_1.default.authenticate('local'), auth_1.login);
router.post('/auth/refresh', passport_1.default.authenticate('jwt'), auth_1.refresh);
exports.default = router;
//# sourceMappingURL=routes.js.map