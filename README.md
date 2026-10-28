# DOCK-SWARM

Небольшая утилита для обновления докер-образа для сервиса в окружении Docker Swarm.  
Поддерживается приватные реестры образов.   

## Установка
```bash
$ npm install dock-swarm
```


## Использование
```js
import DockSwarm from 'dock-swarm';

// настройки авторизации приватного реестра
const ds = new DockSwarm({
    socketPath: '/var/run/docker.sock',
    username: 'oauth',
    password: '123456789',
    serveraddress: 'cr.yandex',
});

// обновляет образ у указанного сервиса
const result = await ds.updateServiceImage('services_app', 'superapp:1.2.3');

// обновляет образ и порядок деплоя "update-order" (можеть быть start-first или stop-first)
const result = await ds.updateServiceImage('services_app', 'superapp:1.2.3', 'start-first');

```