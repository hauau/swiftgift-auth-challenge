"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-body");
const routes_1 = require("./routes");
const passport_1 = require("./passport");
const app = new Koa();
const PORT = process.env.PORT || parseInt(process.env.PORT || '3000', 10);
app.use(bodyparser())
    .use(passport_1.default.initialize())
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
app.listen(PORT);
console.log(`Server listening at port ${PORT}`);
//# sourceMappingURL=app.js.map