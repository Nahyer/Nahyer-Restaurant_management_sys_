const fs = require('fs');
const tables = [
    'city',
    'state',
    'restaurant',
    'address',
    'restaurant_owner',
    'users',
    'driver',
    'comments',
    'orders',
    'menu_item',
    'category',
    'order_menu_item',
    'order_status',
    'status_catalog'
];

function generateTypeAnnotations(tables) {
    let types = '';
    tables.forEach(table => {
        const tableName = table; 
        types += `export type TI${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = typeof ${tableName}.$inferInsert;\n`;
        types += `export type TS${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = typeof ${tableName}.$inferSelect;\n\n`;
    });
    return types;
}

const typeAnnotations = generateTypeAnnotations(tables);

fs.appendFile('./src/drizzle/schema.ts', typeAnnotations, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Type annotations have been appended to schema');
});