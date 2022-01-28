import { LoaderFunction, useLoaderData } from "remix";
import type { GalleryItem } from "@prisma/client";
import { db } from "~/utils/db.server";
import { getGalleryItems } from "~/utils/galleryItems";


// LOADER
export let loader: LoaderFunction = async () => {
    const data = getGalleryItems();    
    return data;
};

// TODO:  NEED TO CREATE A NEW UPLOAD PRESET IN CLOUDINDARY

export default function GalleryItems() {
    console.log("prisma: ", db);
    const galleryItems: GalleryItem[] = useLoaderData();
   
    return (
      <ul>
        {galleryItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }