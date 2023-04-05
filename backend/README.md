# Back-end app

The back-end app was developed with NodeJs and PostgreSQL database.

## Libraries

- ExpressJs [https://expressjs.com/](https://expressjs.com/)
- node-postgres [https://node-postgres.com/](https://node-postgres.com/)
- Yup (Schema Validation) [https://github.com/jquense/yup](https://github.com/jquense/yup)

This project was bootstrapped with Express Generator [https://expressjs.com/en/starter/generator.html](https://expressjs.com/en/starter/generator.html).

## Database Setup

- Install PostgreSQL and create a database with the name `ecommerce` or any other (PostgreSQL has some restrictions on `CREATE TABLE` command, that is why is not part of the script).
- Run the `database-tables.sql` file, it is located in `scripts` folder (this script has some data for products and employees).

## Database configuration file

The database configuration file has default values that can be replaced by environment variables.

```ts
{
  host: env.DB_HOST || "localhost",
  user: env.DB_USER || "ecommerce",
  password: env.DB_PASSWORD || "admin",
  database: env.DB_NAME || "ecommerce",
  port: env.DB_PORT || 5432,
}
```

## Environment Variables Setup

It is important to set a PORT env variable to avoid PORT collision with Front-end app.

### MacOS or Linux

`DEBUG=myapp:* npm start`

### Windows Command Prompt

`set DEBUG=myapp:* & npm start`

### Windows Powershell

Follow this pattern for environment variables with Windows Powershell.

`$env:PORT=4000; $env:DEBUG='backend:*'; npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

The service will start running.

### `npm test`

Launches the test runner.\
