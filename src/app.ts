import * as Koa from 'koa'
import * as bodyparser from 'koa-body';
import router from './routes';
import passport from './passport';

const app = new Koa();
const PORT = process.env.PORT || parseInt(process.env.PORT || '3000', 10);

app.use(bodyparser())
   .use(passport.initialize())
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(PORT);

console.log(`Server listening at port ${PORT}`)
