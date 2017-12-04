# mercado-libre-sre

Es una API para centralizar y cachar las consultas a otras APIs de Mercado Libre.

## Requerimientos

- NodeJS v8.X
- MySQL v5.7
- Redis v4.X
- Docker

## Instalación

- Instalar depencias con `yarn install` en el repositorio.
- Crear base de datos con `node_modules/.bin/sequelize db:create`
- Ejecutar migraciones con `node_modules/.bin/sequelize db:migrate`

## Descripción

Breve descripción de las cosas más importantes.

La API es una aplicacione [express](http://expressjs.com/) que conecta dos APIs de mercado libre, la de items `https://api.mercadolibre.com/items/:item_id` y la de los hijos de los items `https://api.mercadolibre.com/items/:item_id/children`, luego con la información que estas APIs proveen se responde la infomación unificada.

Para mejorar la performace se utilizan el patrón Cache Aside, cachenado todos los pedidos que sean exitosos en la base de datos, evitando que pedidos sucesivos se vuelvan a ejecutar. Para ver la implementación mirar `app/services/item-finder.js`.

Este servicio utiliza el patrón Gateway para consultar y componer respuestas de multiples APIs, para ver su implementación ver `app/services/item-gateway.js`.

Para medir la performance se la aplicación se registran ciertas metricas que puden ser consultadas en `/health`. Para hacer más eficiente el tracking de las metricas se utiliza el patron Pub/Sub (a travez de Redis) para enviar mensajes a un Worker que las procesa en un proceso independiente para no blocker el Event Loop the la aplicación principal.

## Suposiciones que se realizaron

- El endpoint `/health` retorna el resultado para los ultimos 5 minutos agrupando los datos por minuto. Sin embargo en Redis se encuentra toda la información. Se puede configurar para retornar más resultados.

## Development

- Ejecutar `yarn start-development`, esto levanta la aplicación y el worker.

## Tests

Se utilizo `mocha` con las assertions de `chai` para testear.

Se agregaron algunos tests muy basicos (por falta de tiempo) para verificar ciertas cosas.

- Crear base de datos con `NODE_ENV=test node_modules/.bin/sequelize db:create`
- Ejecutar migraciones con `NODE_ENV=test node_modules/.bin/sequelize db:migrate`
- Para ejecutar los tests correr `yarn test`

## Producción (entre comillas)

Para levantr todo en "producción" se utliza docker-compose. Se creo el ejecutable `bin/run` que levanta toda la infraestructura necesaria, crea la base de datos y corre migraciones. Todo se hace en detched mode, por lo que no se ve el output en consola.

Ademas utilzando pm2 se levantan tantas instancias de la web como cores tengas la maquina, permitiendo responder los requests más eficientemente.

### Forma detached

- Ejecutar `bin/run`
- Para bajar los services ejecutar `docker-compose stop`

### Forma standard

- docker-compose up
- docker-compose exec web node_modules/.bin/sequelize db:create
- docker-compose exec web node_modules/.bin/sequelize db:migrate

## Cosas a mejorar

- Las claves/configuraciones de producción no deberian estar comiteadas, pero a efectos de esta aplicación de "juguete" se hizo caso omiso a esta buena práctica.
- Levantar multiples nodos y balancearlos, poniendo por ejemplo Nginx como Load Balancer. Se hizo con pm2, pero se puede mejorar.
- La base de dados no tiene read replicas, se podria hacer.
- La base de datos no tiene clave. Inaceptable para producción, pero como no va ir a poduccion no pasa nada :D
- Agregar más y mejor logging.
- Agregar más tests.
- Configurar un Linter (JSHint, ESlint) para mantener un estilo consitente.
- Agregar algun servicio de integracion continue TravisCI, CircleCI, etc.



