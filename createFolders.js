const fs = require('fs');
const path = require('path');

const baseDir = './src';
const folders = [
  'citys',

  'restaurants',

  'addresses',

  'restaurant_owners',

  'userss',

  'drivers',

  'commentss',

  'orderss',

  'menu_items',
  'categorys',

  'order_menu_items',

  'order_statuss',

  'status_catalogs'
];

// const files = [
//   'controller.ts',
//   'router.ts',
//   'service.ts'
// ];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function removChar(string) {
  if (string.endsWith('es')) {
      return string.slice(0, -2);
  } else if (string.endsWith('s')) {
      return string.slice(0, -1);
  } else {
      return string;
  }
}

folders.forEach(folder => {
  const folderPath = path.join(baseDir, folder);
  
  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath);
  }

  // files.forEach(file => {
  //   const filePath = path.join(folderPath, `${folder}.${file}`);
    
  //   if (!fs.existsSync(filePath)) {
  //     fs.writeFileSync(filePath, '', 'utf8');
  //   }
  // });

  const httpFilePath = path.join(folderPath, `get${folder}Request.http`);
  const httpContent = `
GET http://localhost:3000/${removChar(folder)}
###

GET http://localhost:3000/${removChar(folder)}?limit=2
###

GET http://localhost:3000/${removChar(folder)}/13
###

POST http://localhost:3000/${removChar(folder)}/create
Content-Type: application/json

{
  "name": "Sample Name",
  "code": "Sample Code",
  "city": "Sample City"
}
###

PUT http://localhost:3000/${removChar(folder)}/1
Content-Type: application/json

{
  "name": "Updated Name",
  "code": "Updated Code",
  "city": "Updated City"
}
###

DELETE http://localhost:3000/${removChar(folder)}/12
`;
  const serviceFilePath = path.join(folderPath, `${folder}.service.ts`);
  const serviceContent = `import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TI${capitalizeFirstLetter(removChar(folder))}, TS${capitalizeFirstLetter(removChar(folder))}, ${removChar(folder)} } from "../drizzle/schema";

export const get${capitalizeFirstLetter(removChar(folder))}sService = async (limit?: number): Promise<TS${capitalizeFirstLetter(removChar(folder))}[] | null> => {
  if (limit) {
   return await db.query.${removChar(folder)}.findMany({
      limit: limit,
    });
  }
  return await db.query.${removChar(folder)}.findMany();
};
export const get${capitalizeFirstLetter(removChar(folder))}ByIdService = async (id: number): Promise<TS${capitalizeFirstLetter(removChar(folder))} | undefined> => {
  return await db.query.${removChar(folder)}.findFirst({
     where: eq(${removChar(folder)}.id,id)
    })
}

export const create${capitalizeFirstLetter(removChar(folder))}Service = async (${removChar(folder)}s: TI${capitalizeFirstLetter(removChar(folder))}) => {
  await db.insert(${removChar(folder)}).values(${removChar(folder)}s)
  return \`${capitalizeFirstLetter(removChar(folder))}, has been created\`;
}

export const update${capitalizeFirstLetter(removChar(folder))}Service = async (id: number, ${capitalizeFirstLetter(removChar(folder))}: TI${capitalizeFirstLetter(removChar(folder))}) => {

    await db.update(${removChar(folder)}).set(${capitalizeFirstLetter(removChar(folder))})
    .where(eq(${removChar(folder)}.id, id))
    return \`${capitalizeFirstLetter(removChar(folder))}, has been updated successfully\`
}

export const Delete${capitalizeFirstLetter(removChar(folder))}ByIdService = async (id: number) =>{
  //query the ${removChar(folder)} table and delete the ${removChar(folder)} with the id
  const del${capitalizeFirstLetter(removChar(folder))} = await db.query.${removChar(folder)}.findFirst({
    where: eq(${removChar(folder)}.id, id)
  })
    await db.delete(${removChar(folder)}).where(eq(${removChar(folder)}.id, id))
    return \`${capitalizeFirstLetter(removChar(folder))}, has been deleted successfully\`
}`;
  const controllerFilePath = path.join(folderPath, `${folder}.controller.ts`);
  const controllerContent = `import { Context } from "hono";
import { get${capitalizeFirstLetter(removChar(folder))}sService, create${capitalizeFirstLetter(removChar(folder))}Service, get${capitalizeFirstLetter(removChar(folder))}ByIdService, update${capitalizeFirstLetter(removChar(folder))}Service, Delete${capitalizeFirstLetter(removChar(folder))}ByIdService } from "./${folder}.service";


export const Lists${capitalizeFirstLetter(removChar(folder))}s = async(c: Context) => {
    try {           
        const limit = Number(c.req.query('limit')) 
        const data = await get${capitalizeFirstLetter(removChar(folder))}sService(limit);
        if(!data || data.length == 0) return c.text("No data found" , 404);
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ message: error.message },400);
    }
}

export const Get${capitalizeFirstLetter(removChar(folder))}ById = async(c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const ${removChar(folder)} = await get${capitalizeFirstLetter(removChar(folder))}ByIdService(id);
        if(!${removChar(folder)}) return c.json({ message: "${removChar(folder)} not found"},404);
        return c.json(${removChar(folder)});
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const Create${capitalizeFirstLetter(removChar(folder))} = async(c: Context) => {
    try {
        const ${removChar(folder)} = await c.req.json();
        ${removChar(folder)}.created_at = new Date();
        const new${capitalizeFirstLetter(removChar(folder))} = await create${capitalizeFirstLetter(removChar(folder))}Service(${removChar(folder)});
        if(!new${capitalizeFirstLetter(removChar(folder))}) return c.json({ message: "Unable to create"},404);
        return c.json(new${capitalizeFirstLetter(removChar(folder))}, 201);
    } catch (error: any) {
        return c.json({ error: error.message },400);
    }
   
}

export const Update${capitalizeFirstLetter(removChar(folder))} = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const U${removChar(folder)} = await get${capitalizeFirstLetter(removChar(folder))}ByIdService(id);
        if (!U${removChar(folder)}) return c.text("${capitalizeFirstLetter(removChar(folder))} not found", 404);
        const ${removChar(folder)} = await c.req.json();
        ${removChar(folder)}.updated_at = new Date();
        const up${capitalizeFirstLetter(removChar(folder))} = await update${capitalizeFirstLetter(removChar(folder))}Service(id, ${removChar(folder)});
        if (!up${capitalizeFirstLetter(removChar(folder))}) return c.text("${capitalizeFirstLetter(removChar(folder))} not updated", 404);
        return c.json(up${capitalizeFirstLetter(removChar(folder))}, 201);

    } catch (error: any) {
        return c.json({ message: error.message });
    }
}

export const Delete${capitalizeFirstLetter(removChar(folder))} = async(c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
    const D${capitalizeFirstLetter(removChar(folder))} = await get${capitalizeFirstLetter(removChar(folder))}ByIdService(id);
    if (!D${capitalizeFirstLetter(removChar(folder))}) return c.text("${capitalizeFirstLetter(removChar(folder))} not found", 404);
        const del${capitalizeFirstLetter(removChar(folder))} = await Delete${capitalizeFirstLetter(removChar(folder))}ByIdService(id);
        if (!del${capitalizeFirstLetter(removChar(folder))}) return c.text("${capitalizeFirstLetter(removChar(folder))} not deleted", 404);
        return c.json(del${capitalizeFirstLetter(removChar(folder))}, 201);
    } catch (error: any) {
        return c.json({ message: error.message });
    }
}`;
  const routerFilePath = path.join(folderPath, `${folder}.router.ts`);
  const routerContent = `import { Hono } from "hono";
import { Lists${capitalizeFirstLetter(removChar(folder))}s, Create${capitalizeFirstLetter(removChar(folder))},
     Get${capitalizeFirstLetter(removChar(folder))}ById, Update${capitalizeFirstLetter(removChar(folder))}, Delete${capitalizeFirstLetter(removChar(folder))}} from "./${folder}.controller";
import { ${removChar(folder)}Schema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const ${removChar(folder)}Router = new Hono().basePath('/${removChar(folder)}')

${removChar(folder)}Router.get("", Lists${capitalizeFirstLetter(removChar(folder))}s);
${removChar(folder)}Router.get("/:id", Get${capitalizeFirstLetter(removChar(folder))}ById);
${removChar(folder)}Router.post("/create",zValidator('json', ${removChar(folder)}Schema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),Create${capitalizeFirstLetter(removChar(folder))});
${removChar(folder)}Router.put("/:id", Update${capitalizeFirstLetter(removChar(folder))});
${removChar(folder)}Router.delete("/:id", Delete${capitalizeFirstLetter(removChar(folder))});
`;

  if (!fs.existsSync(serviceFilePath)) {
    fs.writeFileSync(serviceFilePath, serviceContent.trim(), 'utf8');
  }

  if (!fs.existsSync(controllerFilePath)) {
    fs.writeFileSync(controllerFilePath, controllerContent.trim(), 'utf8');
  }
  
  if (!fs.existsSync(routerFilePath)) {
    fs.writeFileSync(routerFilePath, routerContent.trim(), 'utf8');
  }

  if (!fs.existsSync(httpFilePath)) {
    fs.writeFileSync(httpFilePath, httpContent.trim(), 'utf8');
  }
});

console.log('Folders and files created successfully.');