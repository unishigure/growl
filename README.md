# Growl

Regular posting Bot for [Misskey](https://misskey-hub.net/):bell:\
<small>― Snorlax is hungry and waiting for you!</small>

## Feature

- Regular posting
- RSS Feed notification

## [wip] Usage

Create & Edit `.env` file.

```bash
cp docker/.env.sample docker/.env
vi docker/.env
```

Startup containers.

```bash
docker compose -f "docker/compose.yml" up -d --build
```

Run DB migration.

```bash
docker exec api pnpm prisma migrate deploy
```

Deploy success if you can connect to <http://localhost:88>
