"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
const passport_local_1 = require("passport-local");
const JWTStrategy = require("passport-jwt");
const db_1 = require("./db");
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || '30s';
let options = {
    local: {
        usernameField: 'name',
        passwordField: 'password',
        session: false
    },
    jwt: {
        jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: exports.JWT_SECRET,
        session: false,
        passReqToCallback: true,
    },
};
const local = new passport_local_1.Strategy(options.local, (name, password, done) => __awaiter(this, void 0, void 0, function* () {
    const user = db_1.db[name];
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
    return done(null, user);
}));
const jwtLocal = new JWTStrategy.Strategy(options.jwt, (req, payload, done) => __awaiter(this, void 0, void 0, function* () {
    return payload && payload.profile
        ? done(null, payload.profile)
        : done(null, false);
}));
passport.serializeUser((user, done) => {
    return done(null, user);
});
passport.deserializeUser((name, done) => __awaiter(this, void 0, void 0, function* () {
    const user = db_1.db[name];
    return done(null, user);
}));
passport.use('jwt', jwtLocal);
passport.use('local', local);
exports.default = passport;
//# sourceMappingURL=passport.js.map