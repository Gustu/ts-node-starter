# Typescript Node API Starter

Typescript Node API Starter made with Node, Express, Typescript, TypeORM and Docker.

## Getting started

**Dev setup**
1. Create POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB env variables
2. `docker-compose up -d`
3. Create .env file (check .env.example)
4. `yarn tsc`
5. `yarn migrate:all`
6. `yarn dev`

**Prod setup**
1. Create POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB env variables
2. Create .env file (check .env.example)
3. `docker-compose -f docker-compose-prod.yml build`
4. `docker-compose -f docker-compose-prod.yml up -d`

**API**

`GET /api/movies` - get all movies

`POST /api/movies` - create a new movie. Body params: `phrase`

`GET /api/movies/:movieId` - get one movie by id

`GET /api/movies/:movieId/comments` - get movie's comments

`POST /api/movies/:movieId/comments` - create a new movie comment. Body params: `username`, `message`

`GET /api/comments` - get all comments

`GET /api/comments?movieId=:movieId` - get movie's comments 

`POST /api/comments` - create a new movie comment. Body params: `username`, `message`, `movieId`

Rate limit - 20 req / 5 min

## TODO
- Swagger API documentation
- Caching
- Circuit breaker
