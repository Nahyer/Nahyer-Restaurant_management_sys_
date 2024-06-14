import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAddress, TSAddress, address } from "../drizzle/schema";

export const getAddresssService = async (limit?: number): Promise<TSAddress[] | null> => {
  if (limit) {
   return await db.query.address.findMany({
    with:{
      orders:{
        columns:{
          delivery_address_id: true,
          estimated_delivery_time: true,
        }
      },
      city:{
        columns:{
          name: true
        }
      }
     },
      limit: limit,
    });
  }
  return await db.query.address.findMany({
    with:{
      orders:{
        columns:{
          delivery_address_id: true,
          estimated_delivery_time: true,
        }
      },
      city:{
        columns:{
          name: true
        }
      }
     },
  });
};
export const getAddressByIdService = async (id: number): Promise<TSAddress | undefined> => {
  return await db.query.address.findFirst({
     where: eq(address.id,id)
    })
}

export const createAddressService = async (addresss: TIAddress) => {
  await db.insert(address).values(addresss)
  return `Address, has been created`;
}

export const updateAddressService = async (id: number, Address: TIAddress) => {

    await db.update(address).set(Address)
    .where(eq(address.id, id))
    return `Address, has been updated successfully`
}

export const DeleteAddressByIdService = async (id: number) =>{
  //query the address table and delete the address with the id
  const delAddress = await db.query.address.findFirst({
    where: eq(address.id, id)
  })
    await db.delete(address).where(eq(address.id, id))
    return `Address, has been deleted successfully`
}