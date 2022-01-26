import type { GalleryItem } from "@prisma/client";
import { db } from "~/utils/db.server";


// GET
export async function getGalleryItems(): Promise<GalleryItem[]> {
    let results = Array();
    try {
         results = await db.galleryItem.findMany();
    }
    catch(e) {
        console.log("Error Caught in getGalleryItems(): ", e);
    }
    return results;    
}

export async function getGalleryItem(id: string): Promise<GalleryItem> {
    let results = {} as GalleryItem;
    try {
         const item = await db.galleryItem.findUnique({
             where: {id:id}
         });

         // Check that result is not null before assigning it,
         // or Typescript will be have an error.
         if (item != null)
         {
             results = item;
         }
    }
    catch(e) {
        console.log(`Error Caught in getGalleryItem(id: ${id}): `, e);
    }
    return results;  
}