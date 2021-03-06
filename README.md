- [Overview](#overview)
  - [Koa](#koa)
  - [Passport](#passport)
  - [JWT](#jwt)
  - [Authentication](#authentication)
- [Running](#running)
  - [Environment variables](#environment-variables)
  - [User credentials for login](#user-credentials-for-login)
- [Routes](#routes)
  - [Issuing token](#issuing-token)
    - [Request](#request)
    - [Response](#response)
  - [Refreshing token](#refreshing-token)
    - [Request](#request-1)
    - [Headers](#headers)
    - [Response](#response-1)
- [Data endpoits](#data-endpoits)
  - [Public data](#public-data)
    - [Request](#request-2)
    - [Response](#response-2)
  - [Private data](#private-data)
    - [Request](#request-3)
    - [Headers](#headers-1)
    - [Response](#response-3)

# Overview

This API is an example of a simple authentication service using node.js

Tools for the job:
1. Koa.js
2. Passport.js
3. JWT

## Koa

The robust and simple framework for serving and handling web requests through async middleware. There's nothing particular about it for a given task of building authentication API service. Minimal overhead provides great transparency and control over implementation. Both perfect for security sensitive application like auth API and demonstrating decisions in a code challenge.

## Passport

This library will provide convenient middleware for Koa to handle authentication throughout request lifecycle and cleanly separate concerns between app server, auth middleware and router middleware. It exposes single internal API for building any authentication strategy, which makes this implementation more conventional and extendable. 

## JWT

Signed tokens' claims can be verified at the edge without DB roundtrip and used with multiple backends as it can carry both session data and authenticity proof. JWT is convenient to work with in web front- and backends.

## Authentication 

This implementation uses a single JWT token. However in certain projects with requirements calling for stricter, more complex auth flow and/or sliding-sessions it makes sense to use separate `refresh` and `access` tokens: `refresh` token for auth server reissuing `access` tokens while making blacklist or other checks and `access` tokens for per-resource access and tracking session. 

# Running

`npm ci` - Installing dependencies

`npm start` - Run service at port `3000` by default or defined in `PORT` environment variable

## Environment variables

`PORT` - Serve app on this port. `3000` by default.

`JWT_SECRET` - Secret used to sign and verify JWT token. `secret` by default.

`JWT_EXPIRES_IN` - Lifetime of token in zeit/ms compatible format. `30 days` by default.

## User credentials for login

```
name: user
password: 123
```

# Routes

Routes requiring authentication accept token in `Authorization` header with `Bearer` prefix.

Invalid token response:

`401`

`Unauthorized`

## Issuing token
### Request
`POST /auth/login`
### Response
`200`
```JS
{
    "token": "a.b.c",
    "expires_in": "30 days" // zeit/ms format
}
```

## Refreshing token
### Request
`POST /auth/refresh`
### Headers
`Authorization: Bearer ${JWT}`
### Response
```JS
{
    "token": "a.b.c",
    "expires_in": "30 days" // zeit/ms format
}
```

# Data endpoits

## Public data

### Request
`GET /data/public`
### Response
`This is a publicly available data`

## Private data

### Request
`GET /data/private`
### Headers
`Authorization: Bearer ${JWT}`
### Response
`This is a secret available only to a few chosen`


