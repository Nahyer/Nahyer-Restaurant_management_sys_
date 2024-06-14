import { pgTable, serial, text, varchar, integer, primaryKey, timestamp, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";
import {  relations } from "drizzle-orm";

export const city = pgTable("city",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    state_id: integer("state_id").notNull().references(()=>state.id ,{onDelete: "cascade"}),
})
export const cityRelation = relations(city, ({one,many})=>({
    restaurant: many(restaurant),
    address: many(address),
    state: one(state, {
        fields:[city.state_id],
        references:[state.id]
    })
}))

export const state = pgTable("state",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    code: varchar("code").notNull()
})

export const stateRelation = relations(state, ({many})=>({
    city: many(city)
})
)


export const restaurant = pgTable("restaurant",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    street_address: text("street_address").notNull(),
    zip_code: varchar("zip_code").notNull(),
    city_id: integer("city_id").notNull().references(()=>city.id,{onDelete: "cascade"}),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})

export const restaurantRelation = relations(restaurant, ({one,many})=>({
    menu_item: many(menu_item),
    restaurant_owner: many(restaurant_owner),
    city: one(city, {
        fields:[restaurant.city_id],
        references:[city.id]
    })
    
}))

export const address = pgTable("address",{
    id: serial("id").primaryKey(),
    street_address_1: text("street_address_1").notNull(),
    street_address_2: text("street_address_2").notNull(),
    zip_code: varchar("zip_code").notNull(),
    delivery_instructions: text("delivery_instructions").notNull(),
    user_id: integer("user_id").notNull().references(()=>users.id,{onDelete: "cascade"}),
    city_id: integer("city_id").notNull().references(()=>city.id,{onDelete: "cascade"}),
    created_at: timestamp("created_at"),
    updated_at: timestamp("updated_at")
})
export const addressRelation = relations(address, ({one,many})=>({
    orders:many(orders),
    city: one(city, { 
        fields:[address.city_id],
        references:[city.id]
    }),
    users: one(users, {
        fields:[address.user_id],
        references:[users.id]
    })
}))

export const restaurant_owner = pgTable("restaurant_owner",{
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(()=>restaurant.id,{onDelete: "cascade"}),
    owner_id: integer("owner_id").notNull().references(()=>users.id,{onDelete: "cascade"})
})

export const restaurant_ownerRelation = relations(restaurant_owner, ({one,many})=>({
     restaurant: one(restaurant, {
        fields:[restaurant_owner.restaurant_id],
        references:[restaurant.id]
    }),
    users: one(users, {
        fields:[restaurant_owner.owner_id],
        references:[users.id]
    })
}))

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    contact_phone: varchar("contact_phone").notNull(),
    // username: varchar("username").notNull(),
    phone_verified: boolean("phone_verified").notNull(),
    email: varchar("email").notNull(),
    email_verified: boolean("email_verified").notNull(),
    confirmation_code: varchar("confirmation_code").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})
export const usersRelation = relations(users, ({one,many})=>({
    auth: one(auth_on_users, {
        fields:[users.id],
        references:[auth_on_users.user_id]
    }),
    restaurant_owner: many(restaurant_owner),
    address: many(address),
    driver: many(driver),
    comments: many(comments),
    orders: many(orders)    
}))

export const driver = pgTable("driver",{
    id: serial("id").primaryKey(),
    car_make: varchar("car_make").notNull(),
    car_model: varchar("car_model").notNull(),
    car_year: integer("car_year").notNull(),
    user_id: integer("user_id").notNull().references(()=>users.id,{onDelete: "cascade"}),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})
export const driverRelation = relations(driver, ({one,many})=>({
    users: one(users, {
        fields:[driver.user_id],
        references:[users.id]
    }),
    orders: many(orders)
}))

export const comments = pgTable("comments",{
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=>orders.id,{onDelete: "cascade"}),
    user_id: integer("user_id").notNull().references(()=>users.id,{onDelete: "cascade"}),
    comment_text: text("comment_text").notNull(),
    is_complaint: boolean("is_complaint").notNull(),
    is_praise: boolean("is_praise").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
  
})
export const commentsRelation = relations(comments, ({one})=>({
    users: one(users, {
        fields:[comments.user_id],
        references:[users.id]
    }),
    orders: one(orders, {
        fields:[comments.order_id],
        references:[orders.id]
    })
}))

export const orders = pgTable("orders",{
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(()=>restaurant.id,{onDelete: "cascade"}),
    estimated_delivery_time: timestamp("estimated_delivery_time").notNull(),
    actual_delivery_time: timestamp("actual_delivery_time").notNull(),
    delivery_address_id: integer("delivery_address_id").notNull().references(()=>address.id,{onDelete: "cascade"}),
    user_id: integer("user_id").notNull().references(()=>users.id,{onDelete: "cascade"}),
    driver_id: integer("driver_id").notNull().references(()=>driver.id,{onDelete: "cascade"}),
    price: decimal("price").notNull(),
    discount: decimal("discount").notNull(),
    final_price: decimal("final_price").notNull()
})
export const ordersRelation = relations(orders, ({one,many})=>({
    users:  one(users, {
        fields:[orders.user_id],
        references:[users.id]
    }),
    restaurant: one(restaurant, {
        fields:[orders.restaurant_id],
        references:[restaurant.id]
    }),
    driver: one(driver, {
        fields:[orders.driver_id],
        references:[driver.id]
    }),
    address: one(address, {
        fields:[orders.delivery_address_id],
        references:[address.id]
    }),
    comments: many(comments),
    order_menu_item: many(order_menu_item),
    order_status: many(order_status)
}))
export const menu_item = pgTable("menu_item",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(()=>restaurant.id,{onDelete: "cascade"}),
    category_id: integer("category_id").notNull().references(()=>category.id,{onDelete: "cascade"}),
    description: text("description").notNull(),
    ingredients: text("ingredients").notNull(),
    price: decimal("price").notNull(),
    active: boolean("active").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})
export const menu_itemRelation = relations(menu_item, ({one,many})=>({
    restaurant: one(restaurant, {
        fields:[menu_item.restaurant_id],
        references:[restaurant.id]
    }),
    category: one(category, {
        fields:[menu_item.category_id],
        references:[category.id]
    }),
    order_menu_item: many(order_menu_item)
}))

export const category = pgTable("category",{
    id: serial("id").primaryKey().notNull(),
    name: varchar("name").notNull(),

})
export const categoryRelation = relations(category, ({many})=>({
    menu_item: many(menu_item)
})
)

export const order_menu_item = pgTable("order_menu_item",{
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=>orders.id,{onDelete: "cascade"}),
    menu_item_id: integer("menu_item_id").notNull().references(()=>menu_item.id,{onDelete: "cascade"}),
    quantity: integer("quantity").notNull(),
    item_price: decimal("item_price").notNull(),
    price: decimal("price").notNull()
})

export const order_menu_itemRelation = relations(order_menu_item, ({one})=>({
    orders: one(orders, {
        fields:[order_menu_item.order_id],
        references:[orders.id]
    }),
    menu_item:one(menu_item, {
        fields:[order_menu_item.menu_item_id],
        references:[menu_item.id]
    })
}))

export const order_status = pgTable("order_status",{
    id: serial("id").primaryKey().notNull(),
    order_id: integer("order_id").notNull().references(()=>orders.id,{onDelete: "cascade"}),
    status_catalog_id: integer("status_catalog_id").notNull().references(()=>status_catalog.id,{onDelete: "cascade"}),
    created_at: timestamp("created_at").defaultNow()
})  
export const order_statusRelation = relations(order_status, ({one})=>({
    orders: one(orders, {
        fields:[order_status.order_id],
        references:[orders.id]
    }),
    status_catalog: one(status_catalog, {
        fields:[order_status.status_catalog_id],
        references:[status_catalog.id]
    })
}))

export const status_catalog = pgTable("status_catalog",{
    id: serial("id").primaryKey().notNull(),
    name: varchar("name").notNull()
})
export const status_catalogRelation = relations(status_catalog, ({many})=>({
    order_status: many(order_status)
}))

export const role_enum = pgEnum("role_enum",["admin","user","driver","restaurantOwner"])
export const auth_on_users = pgTable("auth_on_users",{
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(()=>users.id,{onDelete: "cascade"}),
    password: varchar("password",{length:100}),
    username: varchar("username",{length:100}),
    role: role_enum("role").default("user")
});

export const auth_on_usersRelation = relations(auth_on_users, ({one})=>({
    users: one(users, {
        fields:[auth_on_users.user_id],
        references:[users.id]
    })
})
);



export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;

export type TIState = typeof state.$inferInsert;
export type TSState = typeof state.$inferSelect;

export type TIRestaurant = typeof restaurant.$inferInsert;
export type TSRestaurant = typeof restaurant.$inferSelect;

export type TIAddress = typeof address.$inferInsert;
export type TSAddress = typeof address.$inferSelect;

export type TIRestaurant_owner = typeof restaurant_owner.$inferInsert;
export type TSRestaurant_owner = typeof restaurant_owner.$inferSelect;

export type TIUsers = typeof users.$inferInsert;
export type TSUsers = typeof users.$inferSelect;

export type TIDriver = typeof driver.$inferInsert;
export type TSDriver = typeof driver.$inferSelect;

export type TIComments = typeof comments.$inferInsert;
export type TSComments = typeof comments.$inferSelect;

export type TIOrders = typeof orders.$inferInsert;
export type TSOrders = typeof orders.$inferSelect;

export type TIMenu_item = typeof menu_item.$inferInsert;
export type TSMenu_item = typeof menu_item.$inferSelect;

export type TICategory = typeof category.$inferInsert;
export type TSCategory = typeof category.$inferSelect;

export type TIOrder_menu_item = typeof order_menu_item.$inferInsert;
export type TSOrder_menu_item = typeof order_menu_item.$inferSelect;

export type TIOrder_status = typeof order_status.$inferInsert;
export type TSOrder_status = typeof order_status.$inferSelect;

export type TIStatus_catalog = typeof status_catalog.$inferInsert;
export type TSStatus_catalog = typeof status_catalog.$inferSelect;

export type TIAuth_on_users = typeof auth_on_users.$inferInsert;
export type TSAuth_on_users = typeof auth_on_users.$inferSelect;
