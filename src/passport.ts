import * as passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import * as JWTStrategy from 'passport-jwt'
import { db } from './db';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || '30s';

let options = {
  local: {
    usernameField: 'name',
    passwordField: 'password',
    session: false
  },
  jwt: {
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    session: false,
    passReqToCallback: true,
  },
}

const local = new LocalStrategy(options.local, async (name, password, done) => {
  const user = db[name];
  const isPasswordCorrect = password === user.password;

  if (!user || !isPasswordCorrect) {
    return done(null, false, {
      message: 'User not found or password doesn\'t match.'
    });
  }
  if (!user.active) {
    return done(null, false, {
      message: 'This user is blacklisted.'
    });
  }

  return done(null, user)
})

const jwtLocal = new JWTStrategy.Strategy(options.jwt, async (req: any, payload: any, done: any) => {
  return payload && payload.profile 
    ? done(null, payload.profile) 
    : done(null, false);
})

passport.serializeUser((user: any, done) => {
  return done(null, user);
});

passport.deserializeUser(async (name: any, done) => {
  const user = db[name];
  return done(null, user)
});

passport.use('jwt', jwtLocal);
passport.use('local', local);

export default passport;
