import * as Router from 'koa-router'; 
import { refresh, login } from './auth';
import passport from './passport';

var router = new Router();

router.get('/data/public', (ctx, next) => {
  ctx.body = `This is a publicly available data`;
});

router.get('/data/private', passport.authenticate('jwt'), (ctx, next) => {
  ctx.body = `This is a secret available only to a few chosen`;
});

router.post('/auth/login', passport.authenticate('local'), login);
router.post('/auth/refresh', passport.authenticate('jwt'), refresh);

export default router;