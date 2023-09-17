## Full Stack E-Commerce + Dashboard & CMS
### Stack used: Next.js 13 App Router, React, Tailwind, Prisma, MySQL

This is a repository for a Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MySQL
### Host Link: ``` ```

## Learn More

Key Features:
* We will utilize Shadcn UI for the Admin interface.
* Our admin dashboard will serve the roles of CMS, Admin, and API.
* You can manage multiple vendors/stores through this singular CMS! (For instance, you can have a "Shoe store," a "Laptop store," and a "Suit store," and our CMS will automatically * * generate API routes for each one individually!)
* You can create, modify, and remove categories.
* You can create, modify, and delete products.
* You can upload multiple images for products and update them as needed.
* You can create, update, and delete filters such as "Color" and "Size," and then associate them in the "Product" creation form.
* You can create, update, and delete "Billboards," which are large text elements at the top of the page. You can attach them to a specific category or use them independently. (Our * * * Admin generates APIs for all these scenarios!)
* You can perform searches across all categories, products, sizes, colors, and billboards with included pagination.
* You can designate products as "featured" to display them on the homepage.
* You can access your order history and sales information.
* You can view graphical representations of your revenue and more.
* You will gain expertise in Clerk Authentication.
* You will learn about order creation.
* You will delve into Stripe checkout and Stripe webhooks.
* You will work with MySQL, Prisma, and PlanetScale for data management.

### Prerequisites
#### Node version 18.x
### Cloning the repository
```
git clone git@github.com:Dev-Harmattan/E-commerce-with-admin-cms.git
```
### Enviroment setup
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### Connect to PlanetScale and push prisma
```
npx prisma generate
npx prisma db push
```

### Start the app
```
npm run dev
```

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




