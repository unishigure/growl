# Scheduled Mi Bot

Misskey に定期投稿を行う Bot を管理、運用するツール

## Feature

- 定時投稿
- 新規RSSフィード通知

## Technology

- Next.js\
    投稿API\
    管理画面
- postgreSQL\
    データ管理
- [Prisma](https://github.com/prisma/prisma)\
    ORM
- [PM2](https://github.com/Unitech/pm2)\
    サービス常駐
- docker container\
    環境管理

## DB Schema

### `bot` table

| column     | type      | note                     |
| ---------- | --------- | ------------------------ |
| id         | serial    | Primary Key              |
| name       | text      | Bot name                 |
| instance   | text      | Misskey Instance URL     |
| token      | text      | Misskey API access token |
| created_at | timestamp |                          |
| updated_at | timestamp |                          |

### `scheduled_note` table

| column        | type      | note                                                     | example                                                               |
| ------------- | --------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| id            | serial    |                                                          | Primary Key                                                           |
| schedule      | text      | Cron schedule                                            | `*/5 * * * * *`                                                       |
| note_template | text      | Scheduled note template                                  | `テストメッセージです。\n送信テスト用のメッセージです。$[bounce 🤖]` |
| note_visible  | text      | Note visibility<br/>(public, home, followers, specified) | specified                                                             |
| bot_id        | serial    | Relation bot id                                          |                                                                       |
| created_at    | timestamp |                                                          |                                                                       |
| updated_at    | timestamp |                                                          |                                                                       |

### `notification_note` table

| column        | type      | note                                                     | example                                                 |
| ------------- | --------- | -------------------------------------------------------- | ------------------------------------------------------- |
| id            | serial    |                                                          | Primary Key                                             |
| rss_url       | text      | Target RSS URL                                           | <https://www.pokemonsleep.net/news/feed/>               |
| schedule      | text      | Cron schedule                                            | `*/5 * * * * *`                                         |
| note_template | text      | Notification note template                               | `📣 新しいニュースが届きました！\n\n${title}\n${link}` |
| note_visible  | text      | Note visibility<br/>(public, home, followers, specified) | specified                                               |
| bot_id        | serial    | Relation bot id                                          |                                                         |
| created_at    | timestamp |                                                          |                                                         |
| updated_at    | timestamp |                                                          |                                                         |

### `rss` table

| column     | type      | note             |
| ---------- | --------- | ---------------- |
| id         | serial    | Primary Key      |
| rss_url    | text      | Relation RSS URL |
| latest_rss | test      | Latest RSS feed  |
| created_at | timestamp |                  |
| updated_at | timestamp |                  |

## API specification

- /api
  - /bot
    - GET : Bot情報を取得
    - POST : Botを新規作成
    - PUT : 指定されたBotを更新
    - DELETE : 指定されたBotを削除
  - /cron
    - PATCH : cronの更新
  - /note
    - POST : ノートを投稿
  - /notification
    - GET : 通知情報を取得
    - POST : 通知を新規作成
    - PUT : 指定された通知を更新
    - DELETE : 指定された通知を削除
  - /rss
    - GET : RSS情報を取得
    - POST : RSSを新規作成
    - PUT : 指定されたRSSを更新
    - DELETE : 指定されたRSSを削除
  - /schedule
    - GET : 定期投稿情報を取得
    - POST : 定期投稿を新規作成
    - PUT : 指定された定期投稿を更新
    - DELETE : 指定された定期投稿を削除
