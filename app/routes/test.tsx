import { LoaderFunction, useLoaderData } from "remix";

import type { GalleryItem } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { galleryItems: Array<GalleryItem> };
export let loader: LoaderFunction = async () => {
    const data: LoaderData = {
      galleryItems: await db.galleryItem.findMany()
    };
    return data;
};

export default function GalleryItems() {
    console.log("prisma: ", db);
    const data = useLoaderData<LoaderData>();
    return (
      <ul>
        {data.galleryItems.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    );
  }