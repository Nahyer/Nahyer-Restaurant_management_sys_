import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { statesRouter } from './states/states.router'
import { usersRouter } from './userss/userss.router'
import { restaurantRouter } from './restaurants/restaurants.router'
import { restaurant_ownerRouter } from './restaurant_owners/restaurant_owners.router'
import { driverRouter } from './drivers/drivers.router'
import { commentsRouter } from './commentss/commentss.router'
import { ordersRouter } from './orderss/orderss.router'
import { menu_itemRouter } from './menu_items/menu_items.router'
import { categoryRouter } from './categorys/categorys.router'
import { order_menu_itemRouter } from './order_menu_items/order_menu_items.router'
import { order_statusRouter } from './order_statuss/order_statuss.router'
import { status_catalogRouter } from './status_catalogs/status_catalogs.router'

import { cityRouter } from './citys/citys.router'
import { addressRouter } from './addresses/addresses.router'
import {trimTrailingSlash} from "hono/trailing-slash";
import { authRouter } from './auth/auth.router'
import ejs from 'ejs'


const app = new Hono({ strict: true})

app.use(logger()) 
app.use(trimTrailingSlash())

app.get('/', (c) => {
  return c.redirect('/api');
});
app.get('/api', (c) => {
  return c.html(ejs.renderFile('./src/index.html'))
})

app.notFound((c) => {
  return c.text('Not Found', 404)
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT),
})

app.route("/api", statesRouter)
app.route("/api", usersRouter)
app.route("/api", cityRouter)
app.route("/api", addressRouter)
app.route("/api", restaurantRouter)
app.route("/api", restaurant_ownerRouter)
app.route("/api", driverRouter)
app.route("/api", commentsRouter)
app.route("/api", ordersRouter)
app.route("/api", menu_itemRouter)
app.route("/api", categoryRouter)
app.route("/api", order_menu_itemRouter)
app.route("/api", order_statusRouter)
app.route("/api", status_catalogRouter)
app.route("/api", authRouter)

console.log(`Server is running on port ${process.env.PORT}`)