## `aetasaal-api`

### Prerequisites:

- NodeJS (=10.8.0)
- NPM (=5.3.0)
- Postgres 10

### Configuration

- Sequelize migration and configuration can be found at 'database/config.json'

### Installing

- Install all NPM Packages
```
npm install
```

- To create database
```
npm run sqlz:createdb
```

- To migrate
```
npm run sqlz:migrate
```
### Scripts

- `npm start` - simply starts the server
- `npm test` - execute all unit tests
- `npm run lint` - lints all the files in `src/` folder
- `npm run lint:fix` - fixes all the possible linting errors
- `npm run watch` - starts the server with hot-reloading
- `npm run sqlz:createdb` - create database if not existing for the config found at database/config.json
- `npm run sqlz:migrate` - run migration from script found at database/migration
- `npm run sqlz:new` - create new migration file
- `npm run sqlz:undo` - undo migration by name

**Suggestion:** To turn on debug messages, set `DEBUG` environment variable to `kickstarter:*`

```bash
λ npm start
```
# Aetasal-11
