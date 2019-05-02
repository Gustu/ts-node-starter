**MOVIEDB API**

Example api made with Node, Express, Typescript and TypeORM.

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


