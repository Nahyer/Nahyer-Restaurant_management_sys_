import { z } from 'zod'


export const usersSchema = z.object({
    name: z.string(),
    contact_phone: z.string(),
    phone_verified: z.boolean(),
    email: z.string(),
    email_verified: z.boolean(),
    confirmation_code: z.string(),
    password: z.string()
})

export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
    city: z.string()
})

export const citySchema = z.object({
    name: z.string(),
    state_id: z.number()
})

export const status_catalogSchema = z.object({
    name: z.string()
})

export const restaurantSchema = z.object({
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number()
})

export const restaurant_ownerSchema = z.object({
    restaurant_id: z.number(),
    owner_id: z.number(),
})


export const addressSchema = z.object({
    street_address_1: z.string(),
    street_address_2: z.string(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
    user_id: z.number(),
    city_id: z.number()
})

export const driverSchema = z.object({
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.number(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean()

})

export const commentsSchema = z.object({
    order_id: z.number(),
    user_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_praise: z.boolean()
})

export const ordersSchema = z.object({
    restaurant_id: z.number(),
    estimated_delivery_time: z.date(),
    actual_delivery_time: z.date(),
    delivery_address_id: z.number(),
    user_id: z.number(),
    driver_id: z.number(),
    price: z.number(),
    discount: z.number(),
    final_price: z.number()
})

export const menu_itemSchema = z.object({
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean()
})

export const categorySchema = z.object({
    name: z.string()
})

export const order_menu_itemSchema = z.object({
    order_id: z.number(),
    menu_item_id: z.number(),
    quantity: z.number(),
    item_price: z.number(),
    price: z.number()
})

export const order_statusSchema = z.object({
    order_id: z.number(),
    status_catalog_id: z.number()
})

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const signupUserSchema = z.object({
    user_id: z.number(),
    username: z.string(),
    password: z.string(),
    role: z.string()
})