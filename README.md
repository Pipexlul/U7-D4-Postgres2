# Unidad 7 - Desafio 4: Postgres 2

## Instrucciones

- Instalar dependencias:
  `npm i`

- Hacer una copia del archivo `.env.example` y nombrarla `.env`

- Editar el archivo `.env` y llenar los campos segun corresponda (En la mayoria de los casos, solo hay que llenar el campo `DB_PASSWORD` con su password de superuser)

- Correr el proyecto con el comando:
  `npm run start` <br/>
  <b>Esto hara que la base de datos se vuelva a crear cada vez que se corra el comando. Recomiendo usar esta comando por lo menos 1 vez para crear la base de datos</b>

- Opcional: Correr el proyecto con el siguiente comando para evitar volver a recrear la base de datos:
  `npm run start:skip`

- Llamar los endpoints <br/>
  `GET /posts` <br/>
  `GET /posts/:id` <br/>
  o <br/>
  `POST /posts`
  o <br/>
  `PUT /posts/:id`
  o <br/>
  `DELETE /posts/:id`

## Notas

Las rutas `POST /posts` y `PUT /posts/:id` contienen un middleware validador en el que espera que 3 propiedades de un objeto JSON existan y no estén vacias. <br/>
Las propiedades son: <br/>
`titulo` <br/>
`url` <br/>
`descripcion` <br/>
