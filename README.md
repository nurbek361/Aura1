# Personal Life Platform / «Мой помощник»

Личное offline-first пространство для задач, привычек, финансов, целей, здоровья и обучения.

## Что работает сейчас

- Expo-приложение с локальным хранением через AsyncStorage.
- Домашний экран с погодным кэшем, задачами, балансом, привычками и целями.
- CRUD для задач и финансовых операций; деньги хранятся в целых minor units и не теряют исходную валюту.
- Поиск по локальным данным.
- Каталог из 114 сур с валидацией нумерации, отметками изучения и прогрессом.
- Профиль, основная валюта, приватность и версионированный JSON-снимок.
- Android Studio-compatible Kotlin/Compose foundation в `android/`.
- Express backend-скелет в `artifacts/api-server/` (только `/health`) как заготовка для будущей синхронизации; эндпоинтов синхронизации пока нет.

## Запуск

```bash
pnpm install
pnpm --filter @workspace/personal-life-platform run dev
```

Откройте превью или отсканируйте QR-код через Expo Go. Для Android Studio откройте каталог `android/`.

## Приватность

Базовые функции локальные. Финансы, здоровье, профиль, история и духовный прогресс не загружаются автоматически. Реальные ключи и подписи не хранятся в репозитории.

## Ограничение среды

Android APK/AAB и Room migration tests требуют Android SDK/Gradle окружения и физического/виртуального устройства; результаты отмечены в `FINAL_REPORT.md`.

## Реальные API

Онлайн-слой подключён к реальным публичным источникам: Open-Meteo (погода/качество воздуха/геокодирование), Frankfurter (курсы), Open Library (книги), TVmaze (шоу), Apple iTunes Search (музыка) и Hacker News (техновости). См. `docs/API_REGISTRY.md`. Каталог public-apis используется как справочник доступных API; конкретные endpoint и условия сверяются по официальной документации.

### Music and Movies
Music uses the Apple iTunes Search API for real search results and plays the API-provided preview URL with Expo Audio. Full tracks are opened through the official Apple source. Movies use TMDB for search/details/trailer metadata; trailers are rendered via the official YouTube embed, while the app never extracts protected full-movie streams. Set `EXPO_PUBLIC_TMDB_ACCESS_TOKEN` in the environment to enable TMDB.
