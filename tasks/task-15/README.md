# Разные наборы переменных окружения

Необходимо реализовать запуск контейнера nodejs с поддержкой разного набор env переменных.

Сами переменные указаны в файлах .env.development, .env.production, .env.staging.

Напишите в Dockerfile сборку образа, а в docker-compose.yaml запуск контейнера.

Для тестирования испльзуйте все три вида `yarn:test`

## Подсказки

Необходимо подкладывать разный набор переменных при запуске контейнера в docker compose.

Вам понадобится [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) настройка.
