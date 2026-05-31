# personal-alina

Лендинг репетитора Алины с Angular-приложением, NestJS API и закрытой админкой для управления контентом.

## Структура

- `apps/frontend` — публичный лендинг и админка на Angular.
- `apps/backend` — NestJS REST API с JWT-авторизацией.
- `prisma` — схема PostgreSQL, миграции и seed.
- `docker-compose.yml` — полный Docker-стек: frontend, backend и PostgreSQL.

## Требования

- Node.js `22.14.0` или совместимая версия не ниже `22.12`.
- npm.
- Docker с поддержкой `docker compose`.

## Запуск Через Docker

После запуска Docker Desktop весь проект поднимается одной командой:

```bash
docker compose up --build
```

Frontend откроется по адресу `http://localhost:4200`, админка — по адресу `http://localhost:4200/admin/login`, API — по адресу `http://localhost:3000/api`.

Backend автоматически дождётся PostgreSQL, применит production-миграции Prisma и выполнит безопасный seed. Повторный запуск не перезаписывает изменения, внесённые через админку.

Для запуска в фоне:

```bash
docker compose up -d --build
```

Для остановки контейнеров:

```bash
docker compose down
```

Те же команды доступны в короткой форме:

```bash
npm run docker:up
npm run docker:logs
npm run docker:down
```

## Локальная Разработка

1. Установить зависимости:

```bash
npm install
```

2. Создать локальный `.env`:

```bash
cp .env.example .env
```

Перед использованием вне локальной среды замените `JWT_SECRET` на длинное случайное значение.

3. Запустить только PostgreSQL:

```bash
docker compose up -d postgres
```

4. Сгенерировать Prisma Client и применить миграцию:

```bash
npm run prisma:generate
npx prisma migrate dev
```

5. Заполнить базу начальными данными:

```bash
npx prisma db seed
```

6. В двух отдельных терминалах запустить backend и frontend:

```bash
npm run start:backend
npm start
```

Во время локальной разработки Angular перенаправляет запросы `/api` в NestJS через dev-proxy.

## Начальная учётная запись

- Логин: `alinamath`
- Пароль: `Laima2010`

Seed хранит пароль в PostgreSQL только в виде bcrypt-хеша. Для production задайте отдельные значения `ADMIN_LOGIN` и `ADMIN_PASSWORD` до первого запуска Railway. Повторный seed не перезаписывает существующую учётную запись и контент из админки.

## Размещение В Интернете

Рекомендуемая схема:

- Angular frontend и админка — Vercel.
- NestJS API — Railway.
- PostgreSQL — Neon.
- Основной домен, например `example.ru`, — Vercel.
- API-поддомен, например `api.example.ru`, — Railway.

До покупки домена можно использовать бесплатные технические адреса Vercel и Railway. После покупки домена достаточно заменить переменные окружения и добавить DNS-записи: переделывать приложение не потребуется.

### 1. Создать PostgreSQL В Neon

1. Создайте новый проект и базу данных в Neon.
2. Скопируйте PostgreSQL connection string.
3. Используйте connection string с включённым SSL, например:

```text
postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

### 2. Разместить Backend В Railway

1. Создайте Railway-проект из GitHub-репозитория.
2. Выберите корень репозитория: Railway автоматически использует `railway.toml` и `apps/backend/Dockerfile`.
3. Добавьте Railway Variables:

```text
DATABASE_URL=<connection string из Neon>
JWT_SECRET=<длинная случайная строка>
JWT_EXPIRES_IN=8h
FRONTEND_URLS=https://<frontend>.vercel.app
ADMIN_LOGIN=alinamath
ADMIN_PASSWORD=<новый сильный пароль для Алины>
```

Сгенерировать `JWT_SECRET` можно локально:

```bash
openssl rand -base64 48
```

4. Создайте публичный Railway Domain.
5. Проверьте health-check:

```text
https://<backend>.up.railway.app/api/health
```

При запуске контейнера Railway автоматически применяет Prisma migrations и выполняет безопасный seed.

### 3. Разместить Frontend В Vercel

1. Импортируйте тот же GitHub-репозиторий в Vercel.
2. Для Root Directory можно оставить корень monorepo или выбрать `apps/frontend`: оба варианта поддерживаются.
3. Конфигурация из `vercel.json` выполнит Angular-сборку и опубликует приложение.
4. Добавьте Vercel Environment Variable:

```text
PUBLIC_API_URL=https://<backend>.up.railway.app/api
```

5. Выполните deployment.
6. Скопируйте итоговый адрес `https://<frontend>.vercel.app` в Railway-переменную `FRONTEND_URLS` и перезапустите backend.
7. Проверьте лендинг и вход в админку:

```text
https://<frontend>.vercel.app
https://<frontend>.vercel.app/admin/login
```

### 4. Подключить Купленный Домен

Когда домен будет куплен:

1. Добавьте основной домен и `www`-версию в Vercel.
2. Добавьте поддомен `api` в Railway как Custom Domain.
3. Создайте DNS-записи, которые покажут Vercel и Railway.
4. Замените Vercel-переменную:

```text
PUBLIC_API_URL=https://api.example.ru/api
```

5. Замените Railway-переменную:

```text
FRONTEND_URLS=https://example.ru,https://www.example.ru
```

6. Повторно разверните frontend и backend.

После этого Алине достаточно открывать:

```text
https://example.ru/admin/login
```

### Production-Переменные

Backend на Railway:

| Переменная | Назначение |
| --- | --- |
| `DATABASE_URL` | Подключение к Neon PostgreSQL |
| `JWT_SECRET` | Подпись JWT-токенов |
| `JWT_EXPIRES_IN` | Время жизни JWT, по умолчанию `8h` |
| `FRONTEND_URLS` | Разрешённые frontend-origin через запятую |
| `ADMIN_LOGIN` | Начальный логин администратора |
| `ADMIN_PASSWORD` | Начальный пароль администратора |

Frontend на Vercel:

| Переменная | Назначение |
| --- | --- |
| `PUBLIC_API_URL` | Публичный адрес Railway API с суффиксом `/api` |

## Проверки

```bash
npm run lint
npm run build:frontend
npm run build:backend
```

## API

- `POST /api/auth/login`
- `GET /api/health`
- `GET /api/content/public`
- `GET|PUT /api/admin/about`
- `GET|POST /api/admin/benefits`
- `PUT|DELETE /api/admin/benefits/:id`
- `GET|POST /api/admin/directions`
- `PUT|DELETE /api/admin/directions/:id`
- `GET|POST /api/admin/reviews`
- `PUT|DELETE /api/admin/reviews/:id`

Все маршруты `/api/admin/*` требуют JWT в заголовке `Authorization: Bearer <token>`.
