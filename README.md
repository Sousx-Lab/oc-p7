# GroupoMania

GroupoMania is a corporate social network (OpenClassRooms project)
## Demo

https://user-images.githubusercontent.com/57526966/169263687-f48b217c-2ada-46cd-9ef8-d35eaf6bb43f.mp4

## Install dependencies

this project use [***workspaces***](https://docs.npmjs.com/cli/v7/using-npm/workspaces) use ***npm*** or ***yarn*** to install dependencies

```bash
  npm install
```

### Setup project

Edit `DATABASE_URL` in `.evn` file and replace database credentials

#### Create database

Create new database

```bash
  npm db:create
```

#### Migrate database

Apply migrations

```bash
  npm db:migrate
```

#### Load fixtures

```bash
  npm db:seed:all
```

*At any time you can do `npm setup:help` to see this setup*

### Run dev server

#### API server

API Server running at `http://:localhost:3000/api` whith `OpenApi` documentation

```bash
  npm back:start
```

#### front-end server

Front server running at `http://localhost:1234`

```bash
  npm front:start
```
