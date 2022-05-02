# Sneakers e-commerce API
- Nextjs Website [Website](https://github.com/celioFagundes/sneakers-frontend/tree/master/site)
- Nextjs Admin panel [Admin Panel](https://github.com/celioFagundes/sneakers-frontend/tree/master/panel).

### About the project
  Sneakers e-commerce is a javascript Fullstack project where you can create, manage and control products, focusing on shoes and sneakers. The project features a admin panel and website made with NextJs and a backend API made with NestJS
  
  ### Technologies used in this project
- [NextJs](https://nextjs.org/) 
- [NestJs](https://nestjs.com/) 
- [Postgres](https://www.postgresql.org/)
- [Heroku](https://id.heroku.com/login)
- [Vercel](https://vercel.com/dashboard)
- [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
- [GraphQl](https://graphql.org/) 
- [AWS S3](https://aws.amazon.com/pt/)
- [useSWR](https://swr.vercel.app/)
- [TailwindCSS](https://tailwindcss.com/)
- [Embla Carousel](https://www.embla-carousel.com/)
- [Sharp](https://github.com/lovell/sharp)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [DateFns](https://date-fns.org/)
- [React Icons](https://react-icons.github.io/react-icons)
- [JWT Tokens](https://jwt.io/introduction)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Class Validator](https://github.com/typestack/class-validator)

### Repositories
- Website: Display and selection of all products,categories and brands registered on the postgres database. 
 - Nextjs Website [Website](https://github.com/celioFagundes/sneakers-frontend/tree/master/site).
- Backend API developed using NestJs , Typescript , GraphQL, TypeORM , Postgres e AWS S3.
- Admin panel developed using  NextJs for creation and management of all products, categories,brand and users, including user register and validation using JWT Tokens, AWS S3 used for storing  product images and brand logos.  
  - Nextjs Admin panel [Admin Panel](https://github.com/celioFagundes/sneakers-frontend/tree/master/panel).

### About sneakers e-commerce API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Developed using  NestJs, Typescript, TypeORM, Postgres, GraphQl e AWS S3

### Functionalities
- NestJs server
- Heroku used to host the API and PostgresDB
- TypeORM used to manage database
- GraphQL queries and mutations  config
- JWT used to user verification and validation
- AWS S3 used to store all images



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Database Migrations

```bash
# generate a new migration synchronizing
$ npm run typeorm migration:generate -- -n <migration description>

# sync database running migrations
$ >npm run typeorm migration:run


## License

Nest is [MIT licensed](LICENSE).
