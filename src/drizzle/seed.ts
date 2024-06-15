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
    // for (let index = 1; index < 10; index++) {
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
       

    //         const restaurnts=[
    //             { name: 'Pizza Palace', street_address: '123 Main St', zip_code: '12345', city_id: 1 },
    // { name: 'Burger Bistro', street_address: '456 Elm St', zip_code: '23456', city_id: 1 },
    // { name: 'Sushi Spot', street_address: '789 Maple Ave', zip_code: '34567', city_id: 2 },
    // { name: 'Pasta Place', street_address: '101 Oak St', zip_code: '45678', city_id: 2 },
    // { name: 'Taco Town', street_address: '202 Pine St', zip_code: '56789', city_id: 3 },
    // { name: 'Steakhouse', street_address: '303 Cedar St', zip_code: '67890', city_id: 3 },
    // { name: 'Vegan Vibes', street_address: '404 Birch St', zip_code: '78901', city_id: 1},
    // { name: 'Seafood Shack', street_address: '505 Walnut St', zip_code: '89012', city_id: 2 },
    // { name: 'BBQ Barn', street_address: '606 Chestnut St', zip_code: '90123', city_id: 3 },
    // { name: 'Dessert Delights', street_address: '707 Spruce St', zip_code: '01234', city_id: 2 }
    //         ]
    //         restaurnts.forEach(async(restaurnt) => {
    //             await db
    //                 .insert(restaurant)
    //                 .values({
    //                     name: restaurnt.name,
    //                     street_address: restaurnt.street_address,
    //                     zip_code: restaurnt.zip_code,
    //                     city_id: restaurnt.city_id,
    //                     created_at: new Date()
    //                 })
    //                 .returning({id: restaurant.id});
    //         })
      

        // const restaurant_owners = await db
        //     .insert(restaurant_owner)
        //     .values({
        //         restaurant_id: faker.number.int({min:1,max:12}),
        //         owner_id: faker.number.int({min:1,max:10})
        //     })
        //     .returning({id: restaurant_owner.id});

        // const addresses = [
        //     { street_address_1: '123 Main St', street_address_2: 'Apt 4B', zip_code: '12345', delivery_instructions: 'Leave at the front door', user_id: 10, city_id: 1 },
        //     { street_address_1: '456 Elm St', street_address_2: 'Suite 5', zip_code: '23456', delivery_instructions: 'Leave with the doorman', user_id: 2, city_id: 2 },
        //     { street_address_1: '789 Maple Ave', street_address_2: 'Unit 10', zip_code: '34567', delivery_instructions: 'Ring the bell', user_id: 3, city_id: 3 },
        //     { street_address_1: '101 Oak St', street_address_2: '', zip_code: '45678', delivery_instructions: 'Leave in the mailbox', user_id: 4, city_id: 2 },
        //     { street_address_1: '202 Pine St', street_address_2: 'Floor 2', zip_code: '56789', delivery_instructions: 'Hand it over personally', user_id: 5, city_id: 2 },
        //     { street_address_1: '303 Cedar St', street_address_2: 'Apt 1A', zip_code: '67890', delivery_instructions: 'Leave at the side door', user_id: 6, city_id: 2 },
        //     { street_address_1: '404 Birch St', street_address_2: 'Suite 200', zip_code: '78901', delivery_instructions: 'Leave at the back door', user_id: 7, city_id:1 },
        //     { street_address_1: '505 Walnut St', street_address_2: 'Unit 8', zip_code: '89012', delivery_instructions: 'Ring the bell twice', user_id: 8, city_id: 2 },
        //     { street_address_1: '606 Chestnut St', street_address_2: 'Floor 3', zip_code: '90123', delivery_instructions: 'Leave with the receptionist', user_id: 9, city_id:3 },
        //     { street_address_1: '707 Spruce St', street_address_2: 'Room 12', zip_code: '01234', delivery_instructions: 'Leave it in the lobby', user_id: 10, city_id:3 }
        //   ];
        //     addresses.forEach(async(addres) => {
        //         await db
        //             .insert(address)
        //             .values({
        //                 street_address_1: addres.street_address_1,
        //                 street_address_2: addres.street_address_2,
        //                 zip_code: addres.zip_code,
        //                 delivery_instructions: addres.delivery_instructions,
        //                 user_id: addres.user_id,
        //                 city_id: addres.city_id,
        //                 created_at: new Date()
        //             })
        //             .returning({id: address.id});
        //     })

        

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
        console.log("Seeding succesdful.... \n"); 
    }
      
    
// }

seed().catch((err) => {
    console.error(err);
    process.exit(0);
})
