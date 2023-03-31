# DNS lookup tool

## Resolve the IPv4 addresses for the given domain; validate the input, store and retrieve the query history.
##Done with Node/Express, Typescript, Knex, Postgres.

### Easy setup with docker
```
docker compose up -d
```

### Run manually
```
npm run start
```

### Runs migrations manually
```
npm run migrate
```

### Revert last migration manually
```
npm run migrate:down
```

### Run typescript checks
```
types:check
```

## Extra routes:

#### Api Swagger docs:
```
/api-docs
```

#### Health check:
```
/health
```

#### Prometheus metrics:
```
/metrics
```

## TODOs
Add env var files and logic

Improve Swagger / documentation
