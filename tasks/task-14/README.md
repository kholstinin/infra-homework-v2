# Nodejs + Reverse Proxy

Необходимо реализовать запуск контейнеров nodejs и nginx чтобы nginx выступал в качестве reverse proxy.

Node.js при этом не должен быть доступен снаружи.

Проксируйте запрос в nodejs из nginx. Nginx запустите на 3030 порту, а nodejs запускается на 3000 порту.

Для запуска используйте docker compose - `compose.yaml` файл.

В nginx для проксирования используйте `proxy_pass`.

Для тестирования используйте `yarn test`

## Подсказки

Используйте образ [nginx](https://hub.docker.com/_/nginx).

Необходимо написать конфигурацию `nginx/nginx.conf` и скрипт запуска в `compose.yaml`.

Путь конфига внутри образа - `/etc/nginx/nginx.conf`, нужно скопировать его в образ.

Используйте единую сеть для контейнеров - `networks`.

[Документация](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) по настройке nginx как reverse proxy

Docker compose [reference](https://docs.docker.com/reference/compose-file/).
