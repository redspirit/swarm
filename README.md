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
    username: 'oauth',
    password: '123456789',
    serveraddress: 'cr.yandex',
});

// обновляет образ у указанного сервиса
ds.updateServiceImage('services_app', 'superapp:1.2.3').then(res => {
    consle.log('Docker output:', res);
}).catch(err => {
    console.error(err);
});

```