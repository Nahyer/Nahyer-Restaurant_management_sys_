import "dotenv/config";
import {city,state,restaurant,address,
        restaurant_owner,driver,
        comments,orders,menu_item,
        category,order_menu_item,
        order_status,status_catalog,
        users} from "./schema"
import {faker} from "@faker-js/faker";
import db from "./db";
import { min } from "drizzle-orm";

async function seed() {
    console.log("Seeding.... \n")
    for (let index = 1; index < 10; index++) {
        // const states = await db
        // .insert(state)
        // .values({
        //     name: faker.address.city(),
        //     code: faker.address.state(),
        //     city: faker.address.city()
        // })
        // .returning({id: state.id});

        // const citys = await db
        // .insert(city)
        // .values({
        //     name: faker.address.city(),
        //     state_id: faker.number.int({min:1,max:10}),
        // })
        // .returning({id: city.id});
        
        // const user = await db
        //     .insert(users)
        //     .values({
        //         name: faker.person.firstName(),
        //         contact_phone: faker.phone.number(),
        //         phone_verified: faker.datatype.boolean(),
        //         email: faker.internet.email(),
        //         email_verified: faker.datatype.boolean(),
        //         confirmation_code: faker.string.alphanumeric(6),
        //         password: faker.internet.password(),
        //         created_at: faker.date.recent(),
        //         updated_at: faker.date.recent()
        //     })
        //     .returning({id: users.id});
        
        // const status_catalogs = await db
        //     .insert(status_catalog)
        //     .values({
        //         name: faker.person.firstName()
        //     })
        //     .returning({id: status_catalog.id});
       
        // const restaurants = await db
        //     .insert(restaurant)
        //     .values({
        //         id: 9,
        //         name: faker.company.buzzAdjective(),
        //         street_address: faker.address.streetAddress(),
        //         zip_code: faker.location.zipCode(),
        //         city_id: faker.number.int({min:1,max:10}),
        //         created_at: faker.date.recent(),
        //         updated_at: faker.date.recent()
        //     })
        //     .returning({id: restaurant.id});

        // const restaurant_owners = await db
        //     .insert(restaurant_owner)
        //     .values({
        //         restaurant_id: faker.number.int({min:1,max:12}),
        //         owner_id: faker.number.int({min:1,max:10})
        //     })
        //     .returning({id: restaurant_owner.id});

        // const addresses = await db
        //     .insert(address)
        //     .values({
        //         street_address_1: faker.address.streetAddress(),
        //         street_address_2: faker.address.streetAddress(),
        //         zip_code: faker.location.zipCode(),
        //         delivery_instructions: faker.lorem.sentence(),
        //         user_id: faker.number.int({min:1,max:10}),
        //         city_id: faker.number.int({min:1,max:15}),
        //         created_at: faker.date.recent(),
        //         updated_at: faker.date.recent()
        //     })
        //     .returning({id: address.id});

        

        // const drivers = await db
        //     .insert(driver)
        //     .values({
        //         car_make: faker.vehicle.manufacturer(),
        //         car_model: faker.vehicle.model(),
        //         car_year: faker.number.int(100),
        //         user_id: faker.number.int({min:1,max:15}),
        //         online: faker.datatype.boolean(),
        //         delivering: faker.datatype.boolean(),
        //         created_at: faker.date.recent(),
        //         updated_at: faker.date.recent()                
        //     })
        //     .returning({id: driver.id});

       
        // const order = await db
        //     .insert(orders)
        //     .values({
        //         restaurant_id: faker.number.int({min:1,max:10}),
        //         estimated_delivery_time: faker.date.recent(),
        //         actual_delivery_time: faker.date.recent(),
        //         delivery_address_id: faker.number.int({min:1,max:23}),
        //         user_id: faker.number.int({min:1,max:10}),
        //         driver_id: faker.number.int({min:1,max:18}),
        //         price: faker.commerce.price(),
        //         discount: faker.commerce.price(),
        //         final_price: faker.commerce.price()
        //     })
        //     .returning({id: orders.id});

        // const categories = await db
        //     .insert(category)
        //     .values({
        //         name: faker.commerce.product(),
        //     })
        //     .returning({id: category.id});
        //     categories.length += categories.length;
        //     console.log(categories.length);

        // const menu_items = await db
        //     .insert(menu_item)
        //     .values({
        //         name: faker.commerce.product(),
        //         restaurant_id: faker.number.int({min:9,max:10}),
        //         category_id: faker.number.int({min:1,max:9}),
        //         description: faker.lorem.sentence(),
        //         ingredients: faker.lorem.sentence(),
        //         price: faker.commerce.price(),
        //         active: faker.datatype.boolean(),
        //         created_at: faker.date.recent(),
        //         updated_at: faker.date.recent()
        //     })
        //     .returning({id: menu_item.id});

        // const comment = await db
        // .insert(comments)
        // .values({
        //     order_id: faker.number.int({min:1,max:15}),
        //     user_id: faker.number.int({min:1,max:15}),
        //     comment_text: faker.lorem.sentence(),
        //     is_complaint: faker.datatype.boolean(),
        //     is_praise: faker.datatype.boolean(),
        //     created_at: faker.date.recent(),
        //     updated_at: faker.date.recent()
        // })
        // .returning({id: comments.id});
      
        // const order_menu_items = await db
        //     .insert(order_menu_item)
        //     .values({
        //         order_id: faker.number.int({min:1,max:15}),
        //         menu_item_id: faker.number.int({min:1,max:10}),
        //         quantity: faker.datatype.number(),
        //         item_price: faker.commerce.price(),
        //         price: faker.commerce.price()
        //     })
        //     .returning({id: order_menu_item.id});

        // const order_statuses = await db
        //     .insert(order_status)
        //     .values({
        //         order_id: faker.number.int({min:1,max:16}),
        //         status_catalog_id:faker.number.int({min:1,max:9}),
        //         created_at: faker.date.recent()
        //     })
        //     .returning({id: order_status.id});

        // console.log(user);
        // console.log(status_catalogs);     
    }
      
    console.log("Seeding succesdful.... \n");
}

seed().catch((err) => {
    console.error(err);
    process.exit(0);
})
