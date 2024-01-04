# Full Stack Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, PostgreSQL

This is a repository for a Full Stack Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, PostgreSQL

## Cloning the repository

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FRONTEND_STORE_URL=

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
```

### Start the app

```shell
npm run dev
```

## Demo Images

![colors](/docs/images/colours.png)
![sizes](/docs/images/sizes.png)
![brands](/docs/images/brands.png)
![categories](/docs/images/categories.png)
![products](/docs/images/products.png)
![create product](/docs/images/create-product.png)