# MERN Food Ordering App

Customers can search for restaurants by city, filter by cuisine, browse menus, pay through Stripe Checkout, and track their orders. Restaurant owners can manage their menu and cover image, view incoming orders, and update their status.

- [Frontend](frontend/) uses React, TypeScript, Vite, React Router, React Query, and Tailwind CSS.
- [Backend](backend/) uses Express and TypeScript. MongoDB stores user profiles, restaurants, and orders through Mongoose.
- Auth0 handles sign-in and issues API access tokens. Cloudinary stores restaurant images. Stripe hosts checkout and sends payment events to the API.

## Table of contents

- [Architecture](#architecture)
- [Frontend routes](#frontend-routes)
- [Run locally](#run-locally)
- [API routes](#api-routes)
- [Request and response examples](#request-and-response-examples)
- [Build and deploy](#build-and-deploy)
- [Troubleshooting](#troubleshooting)

## Architecture

The React client calls the Express API using Fetch. React Query manages server data and polls the customer order list every five seconds. The client keeps each restaurant's cart in browser session storage.

| Directory | Responsibility |
| --- | --- |
| [frontend/src/pages](frontend/src/pages/) | Screens for discovery, checkout, account, and restaurant management |
| [frontend/src/api](frontend/src/api/) | React Query hooks and API requests |
| [frontend/src/auth](frontend/src/auth/) | Auth0 provider and protected routes |
| [frontend/src/forms](frontend/src/forms/) | Profile and restaurant forms |
| [backend/src/routes](backend/src/routes/) | HTTP routes and their middleware |
| [backend/src/controllers](backend/src/controllers/) | Request handling, database queries, uploads, and checkout |
| [backend/src/middleware](backend/src/middleware/) | Auth0 token checks, local user lookup, and request validation |
| [backend/src/models](backend/src/models/) | MongoDB schemas |

### Data model

| Model | Stores |
| --- | --- |
| User | Auth0 subject (`auth0Id`), email, and delivery profile |
| Restaurant | Owner reference, location, cuisines, delivery fee and estimate, cover image URL, and embedded menu items |
| Order | Customer and restaurant references, delivery details, cart items, status, creation time, and total recorded from Stripe |

The API stores menu prices, delivery fees, and order totals in **US cents**. Estimated delivery time is in minutes.

### How an order moves through the app

1. The customer signs in with Auth0. The callback creates the local user profile if it does not exist. The customer then enters their delivery details.
2. The customer opens a restaurant and adds menu items to its cart. The API uses the restaurant's stored menu prices and delivery fee to create a Stripe Checkout session and saves the order as `placed`.
3. Stripe redirects the browser to the order status page on success or back to the restaurant on cancellation. The signed webhook records the total and sets the order to `paid`.
4. The restaurant owner updates fulfillment from the management page. The status values used by the app are `placed`, `paid`, `inProgress`, `outForDelivery`, and `delivered`.

## Frontend routes

| Route | Access | Screen |
| --- | --- | --- |
| `/` | Public | Home and city search |
| `/search/:city` | Public | Restaurant results, filters, sorting, and pagination |
| `/detail/:restaurantId` | Public | Restaurant details, menu, and cart. Checkout requires sign-in. |
| `/auth-callback` | Auth0 redirect | Initializes the signed-in user's local profile |
| `/user-profile` | Signed in | Edit name and delivery address |
| `/order-status` | Signed in | View orders and their current status |
| `/manage-restaurant` | Signed in | Create or edit your restaurant and manage its incoming orders |

## Run locally

You need Node.js and npm, a running MongoDB instance or Atlas connection string, an Auth0 tenant, Cloudinary credentials, and a Stripe test secret key. To test payment events locally, install and sign in to the Stripe CLI.

From the repository root, install both packages:

```sh
npm --prefix backend ci
npm --prefix frontend ci
```

Create `backend/.env`:

```dotenv
MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/foodapp
AUTH0_AUDIENCE=https://food-ordering-api
AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.auth0.com/
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:7000
VITE_AUTH0_DOMAIN=YOUR_TENANT.auth0.com
VITE_AUTH0_CLIENT_ID=YOUR_SPA_CLIENT_ID
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/auth-callback
VITE_AUTH0_AUDIENCE=https://food-ordering-api
```

Replace the placeholders with your values. For Atlas, replace the local MongoDB URI and allow your IP in the project's network access settings. Keep secrets in the backend environment. Vite exposes `VITE_*` values to the browser.

In Auth0, create a **Single Page Application** and an **API**. Use the API identifier as the audience in both files. Configure the SPA with these URLs:

| Auth0 setting | Local value |
| --- | --- |
| Allowed Callback URLs | `http://localhost:5173/auth-callback` |
| Allowed Logout URLs | `http://localhost:5173` |
| Allowed Web Origins | `http://localhost:5173` |

### Start the API and frontend

Run each block in its own terminal, starting from the repository root:

```sh
cd backend
npx nodemon src/index.ts
```

```sh
cd frontend
npm run dev
```

Open [the app](http://localhost:5173). The API listens on port 7000. [GET /health](http://localhost:7000/health) checks that the HTTP server responds.

### Test checkout

1. Run `npm run stripe` from `backend/` to forward Stripe events to the local webhook.
2. Copy the listener's signing secret into `STRIPE_WEBHOOK_SECRET` and restart the API. Once configured, you can also use `npm run dev` in `backend/` to start the API and listener together.
3. Sign in and fill in your delivery profile. If the database is empty, create a restaurant with a menu item under **Manage Restaurant**. Search for its city, add an item to the cart, and complete Stripe Checkout in test mode.
4. Check the order status in the app. The API creates the order as `placed` and sets it to `paid` after it receives a signed `checkout.session.completed` event.

### Check MongoDB on its own

Run this PowerShell command from `backend/` to load `.env` and ping the configured database:

```powershell
@'
const mongoose = require('mongoose');

async function ping() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(await mongoose.connection.db.command({ ping: 1 }));
  } finally {
    await mongoose.disconnect();
  }
}

ping().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
'@ | node -r dotenv/config -
```

Expect `{ ok: 1 }`. If Mongoose reports an undefined URI, check the working directory and the `MONGODB_CONNECTION_STRING` name in `backend/.env`.

## API routes

Protected routes expect an Auth0 access token in the `Authorization: Bearer <token>` header.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | Public | Check that the API responds |
| GET | `/api/restaurant/search/:city` | Public | Search restaurants by city |
| GET | `/api/restaurant/:restaurantId` | Public | Fetch a restaurant and its menu |
| GET, POST, PUT | `/api/my/user` | Auth0 | Read, create, or update the current profile |
| GET, POST, PUT | `/api/my/restaurant` | Auth0 | Read, create, or update the current user's restaurant |
| GET | `/api/my/restaurant/order` | Auth0 | List incoming orders for the current user's restaurant |
| PATCH | `/api/my/restaurant/order/:orderId/status` | Auth0 | Update an order's status |
| GET | `/api/order` | Auth0 | List the current customer's orders |
| POST | `/api/order/checkout/create-checkout-session` | Auth0 | Create an order and a Stripe Checkout session |
| POST | `/api/order/checkout/webhook` | Stripe signature | Receive Stripe events and record payment |

## Request and response examples

Examples use `http://localhost:7000`. Replace the sample IDs with IDs returned by your API. For authenticated requests, send the Auth0 API access token as `Authorization: Bearer <token>`. The API also looks up the local profile by the token's subject. Profile creation is the exception because it runs before that profile exists.

### Search restaurants

```http
GET /api/restaurant/search/Warsaw?searchQuery=pizza&selectedCuisines=Italian&sortOption=deliveryPrice&page=1
```

| Query parameter | Behavior |
| --- | --- |
| `searchQuery` | Case-insensitive match against restaurant name or cuisines |
| `selectedCuisines` | Comma-separated filters. Restaurants must match every selected cuisine. |
| `sortOption` | Ascending sort by field. The default is `lastUpdated`. Use `deliveryPrice` or `estimatedDeliveryTime` to sort by cost or speed. |
| `page` | Starts at 1, with 10 results per page |

The response is `{ "data": [...], "pagination": { "total": 12, "page": 1, "pages": 2 } }`. If no restaurants match the city, the API returns HTTP 404 with an empty `data` array. If the city exists but the filters match nothing, it returns HTTP 200 with an empty array.

### Create or update a profile

`POST /api/my/user` accepts JSON with `auth0Id` and `email`. The Auth0 callback sends this request using the signed-in user's subject and email. The API returns 201 with the new profile, or 200 with an empty body if the profile already exists.

`PUT /api/my/user` accepts the delivery profile as JSON and returns the updated profile:

```json
{
  "name": "Alex Morgan",
  "addressLine1": "15 Main Street",
  "city": "Warsaw",
  "country": "Poland"
}
```

### Create or update a restaurant

Both `POST /api/my/restaurant` and `PUT /api/my/restaurant` use `multipart/form-data`. Submit these fields:

| Field | Example |
| --- | --- |
| `restaurantName` | `Corner Pizza` |
| `city` | `Warsaw` |
| `country` | `Poland` |
| `deliveryPrice` | `299` ($2.99) |
| `estimatedDeliveryTime` | `35` minutes |
| `cuisines[0]` | `Italian` |
| `menuItems[0][name]` | `Margherita` |
| `menuItems[0][price]` | `1099` ($10.99) |
| `imageFile` | Cover image, up to 5 MiB |

Use successive indexes for additional cuisines and menu items. The image is required on create. Omitting it on update keeps the current image. Create returns 201 with the restaurant or 409 if the account already has one. Update returns 200 with the restaurant or 404 if the account has none.

### Start checkout

`POST /api/order/checkout/create-checkout-session` accepts JSON:

```json
{
  "restaurantId": "507f1f77bcf86cd799439011",
  "cartItems": [
    {
      "menuItemId": "507f1f77bcf86cd799439012",
      "name": "Margherita",
      "quantity": "2"
    }
  ],
  "deliveryDetails": {
    "email": "alex@example.com",
    "name": "Alex Morgan",
    "addressLine1": "15 Main Street",
    "city": "Warsaw"
  }
}
```

The API returns `{ "url": "..." }` with the hosted Checkout URL. It sends the order ID to Stripe in the session metadata so the webhook can find the matching order. The webhook expects the raw request body and Stripe's `Stripe-Signature` header.

### Update an order's status

Send `{ "status": "inProgress" }` as JSON to `PATCH /api/my/restaurant/order/:orderId/status`. The API returns the updated order. It returns 404 for a missing order or 401 if the order belongs to another restaurant. The customer and owner list endpoints return arrays of orders with populated restaurant and user records.

## Build and deploy

- **Frontend:** Run `npm run build` in `frontend/` and serve `frontend/dist/`. Set the frontend environment variables before building and configure the host to serve `index.html` for client routes such as `/auth-callback`. Run `npm run lint` from the same directory for ESLint.
- **Backend:** Run `npm run build` and then `npm start` in `backend/`. Supply the backend environment variables and route traffic to port 7000, which is set in code.
- **Integrations:** Set `FRONTEND_URL` and `VITE_API_BASE_URL` to the deployed origins and update the Auth0 callback, logout, and web origin URLs. Register `/api/order/checkout/webhook` on the deployed API in Stripe, subscribe it to `checkout.session.completed`, and use that endpoint's signing secret.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `openUri()` reports an undefined URI | Run the API or MongoDB check from `backend/` and verify that its `.env` defines `MONGODB_CONNECTION_STRING`. |
| MongoDB ping times out | Check that the local database is running or that Atlas allows your IP and the URI is correct. |
| `/health` responds but database requests fail | Run the standalone MongoDB ping. The health endpoint only checks the HTTP server. |
| Auth0 rejects the redirect or the API returns 401 | Check the exact callback URL, issuer and audience. Confirm the browser is sending an API access token and the account has a local profile. |
| The order stays `placed` after checkout | Check the Stripe listener, the webhook path, and the signing secret. Restart the API after changing the secret. |
| A restaurant image fails to upload | Check the backend Cloudinary credentials and the 5 MiB file limit. |
