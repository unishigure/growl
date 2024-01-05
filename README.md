# Growl

Regular posting Bot for [Misskey](https://misskey-hub.net/):bell:
<small>― Snorlax is hungry and waiting for you!</small>

## Feature

- Regular posting
- RSS Feed notification

## Usage

wip

```bash
cp docker/.env.sample docker/.env
vi docker/.env
```

```bash
docker compose -f "docker/compose.yml" up -d --build
```

```bash
docker exec -it api /bin/bash
```

```bash
pnpm prisma migrate deploy
```

Deploy success if you can connect to <http://localhost:88>
