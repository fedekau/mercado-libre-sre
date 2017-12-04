# mercado-libre-sre

Es una API para centralizar y cachar las consultas a otras APIs the Mercado Libre.

## Requerimientos

- NodeJS v8.X
- MySQL v5.7
- Redis v4.X

## Instalación

- Instalar depencias con `yarn install` en el repositorio.
- Crear base de datos con `node_modules/.bin/sequelize db:create`
- Ejecutar migraciones con `node_modules/.bin/sequelize db:migrate`

## Descripción

Breve descripción de las cosas más importantes.

La API es una aplicacione [express](http://expressjs.com/) que conecta dos API de mercado libre, la de items `https://api.mercadolibre.com/items/:item_id` y la de los hijos de los items `https://api.mercadolibre.com/items/:item_id/children` que una vez consulatadas estas, los resultados se utilizan para responder.

Para mejorar la performace se utilizan el patrón Cache Aside, cachenado todos los pedidos que sean exitosos en la base de datos, evitan que pedidos sucesivos se vuelvan a ejecutar. Para ver la implementación mirar `app/services/item-finder.js`.

Este services utiliza el patron Gateway para consultar y compinar respuestan de multiples APIs, para ver su implementación ver `app/services/item-gateway.js`.

Para medir la performance se la aplicación se registran ciertas metricas que puden ser consultadas en `/health`. Para hacer más eficiente el tracking de las metricas se utilizan el patron Pub/Sub (a travez de Redis) para enviar mensajes a un Worker que las procesa en un proceso independiente para no blocker el Event Loop the la aplicación principal.

## Suposiciones que te realizaron

- El endpoint `/health` retorna el resultado para los ultimos 5 minutos agrupando los datos por minuto. Sin embargo en Redis se encuentra toda la información. Se puede configurar para retornar mas resultados.

## Development

- Ejecutar `yarn start-development`, esto levanta la aplicacion y el worker.

## Tests

Se utilizo `mocha` con las assertions de `chai` para testear.

Se agregaron algunos tests muy basicos (por falta de tiempo) para verificar ciertas cosas.

- Crear base de datos con `NODE_ENV=test node_modules/.bin/sequelize db:create`
- Ejecutar migraciones con `NODE_ENV=test node_modules/.bin/sequelize db:migrate`
- Para ejecutar los tests correr `yarn test`

## Ejecutar

Para levantr todo en "producción" se utliza docker-compose. Se creo el ejecutable `bin/run` qur levanta toda la infraestructura necesaria, crea la base de datos y corre migraciones. Todo se hace ne detched mode, por lo que no se ve el output en consola.

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
- La base de tados no tiene read replicas, se podria hacer.
- La base de datos no tiene clave. Inaceptable para producción, pero como no va ir a poduccion no pasa nada :D
- Agregar mas y mejor logging.



