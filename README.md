# CRUD API

## Description

Implementation of a simple CRUD API using in-memory database underneath

## Entry notes

#### 🚀 Use ^22.x.x LTS version of Node.js (current used 22.9.0)

```bash
$ node --version
```

Otherwise, please install [Node.js](https://nodejs.org) for required version.

#### 🚀 Install dependencies

```bash
$ npm install
```

> **Note (before any further action):**
>
> -   Rename `.env.sample` to `.env` – it contains application environmental variables.
> -   By default, the PORT is set to **4000**

---

### 🚀 Scripts to run

#### Run in `Development` mode

```bash
# Development mode
$ npm run start:dev
```

#### Run in `Production` mode

```bash
# Production mode
$ npm run start:prod
```

### Endpoints

| methods | endpoints                             |
| :-----: | ------------------------------------- |
|   GET   | http://localhost:4000/api/users       |
|   GET   | http://localhost:4000/api/users/{:id} |
|  POST   | http://localhost:4000/api/users       |
|   PUT   | http://localhost:4000/api/users/{:id} |
| DELETE  | http://localhost:4000/api/users/{:id} |
